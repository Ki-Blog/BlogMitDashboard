provider "aws" {
  region = var.region
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}

data "aws_availability_zones" "availibility_zones" {
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}

module "vpc" {
  source = "terraform-aws-modules/vpc/aws"
  name = "${var.clustername}-vpc"
  cidr = "10.0.0.0/16"
  azs = slice(data.aws_availability_zones.availibility_zones.names, 0, 3)
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.4.0/24", "10.0.5.0/24", "10.0.6.0/24"]
  enable_nat_gateway = true
  single_nat_gateway = true
  enable_dns_hostnames = true

  public_subnet_tags = {
    "kubernetes.io/cluster/${var.clustername}" = "shared"
    "kubernetes.io/role/elb"                  = 1
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${var.clustername}" = "shared"
    "kubernetes.io/role/internal-elb"         = 1
  }
}

module "eks" {
  source = "terraform-aws-modules/eks/aws"
  cluster_name    = var.clustername
  cluster_version = "1.29"
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnets
  cluster_endpoint_public_access = true
  enable_cluster_creator_admin_permissions = true

  eks_managed_node_group_defaults = {
    ami_type = "AL2_x86_64"
  }

  eks_managed_node_groups = {
    one = {
      name           = "nodegroup-1"
      instance_types = ["t3.small"]
      min_size     = 2
      max_size     = 3
      desired_size = 2
    }
  }
}

resource "null_resource" "update_kubeconfig" {
  depends_on = [module.eks]
  provisioner "local-exec" {
    command = "aws eks update-kubeconfig --name ${module.eks.cluster_name} --region ${var.region}"
  }
}

resource "null_resource" "helm_repo_update" {
  provisioner "local-exec" {
    command = "helm repo add argo https://argoproj.github.io/argo-helm && helm repo update"
  }
  depends_on = [null_resource.update_kubeconfig]
}

resource "helm_release" "argocd" {
  name            = "argocd"
  repository      = "https://argoproj.github.io/argo-helm"
  chart           = "argo-cd"
  create_namespace = true
  namespace       = "argocd"
  depends_on = [null_resource.helm_repo_update]
}

resource "aws_lb" "argocd" {
  name               = "${var.clustername}-argocd-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.argocd_lb.id]
  subnets            = module.vpc.public_subnets

  enable_deletion_protection = false
}

resource "aws_lb_target_group" "argocd_http" {
  name     = "argocd-http"
  port     = 80
  protocol = "HTTP"
  vpc_id   = module.vpc.vpc_id

  health_check {
    path                = "/healthz"
    interval            = 30
    timeout             = 5
    healthy_threshold   = 5
    unhealthy_threshold = 2
    matcher             = "200"
  }
}


resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.argocd.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.argocd_http.arn
  }
}


resource "aws_security_group" "argocd_lb" {
  name        = "${var.clustername}-argocd-lb"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

data "template_file" "ingress_template" {
  template = file("${path.module}/../k8s/ingress.tpl")
  vars = {
    elb_dns = replace(module.eks.cluster_endpoint, "https://", "")
  }
}

resource "local_file" "ingress_yaml" {
  filename = "${path.module}/../k8s/BlogDashboard-chart/templates/ingress.yaml"
  content  = data.template_file.ingress_template.rendered
}

resource "null_resource" "patch_and_login" {
  provisioner "local-exec" {
    command = "sh script.sh"
  }
}

resource "null_resource" "set_context" {
  provisioner "local-exec" {
    command = <<EOT
      if [ -f $HOME/.kube/config.lock]; then
        rm $HOME/.kube/config.lock
      fi
      kubectl config set-context --current --namespace=argocd
    EOT
    interpreter = ["bash", "-c"]
  }
}

resource "null_resource" "argocd_add_repo" {
  provisioner "local-exec" {
    command = <<EOT
    EXTERNAL_ENDPOINT=$(cat /tmp/argocd_endpoint)
    argocd repo add https://github.com/Ki-Blog/BlogMitDashboard.git --username kpblmMik --password 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 --server $EXTERNAL_ENDPOINT
    EOT
    interpreter = ["bash", "-c"]
  }
  depends_on = [null_resource.patch_and_login]
}

resource "null_resource" "apply_argocd_manifest" {
  provisioner "local-exec" {
    command = "kubectl apply -f argocd.yml"
  }
  depends_on = [null_resource.argocd_add_repo]
}

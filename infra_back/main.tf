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

  enable_nat_gateway   = true
  single_nat_gateway   = true
  enable_dns_hostnames = true

  public_subnet_tags = {
    "kubernetes.io/cluster/${var.clustername}" = "shared"
    "kubernetes.io/role/elb"                      = 1
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${var.clustername}" = "shared"
    "kubernetes.io/role/internal-elb"             = 1
  }

}

module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = var.clustername
  cluster_version = "1.29"

  vpc_id                         = module.vpc.vpc_id
  subnet_ids                     = module.vpc.private_subnets
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
  depends_on = [ module.eks ]
  provisioner "local-exec" {
    command = "aws eks update-kubeconfig --name ${var.clustername} --region ${var.region}"
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

data "template_file" "ingress_template" {
  template = file("${path.module}/../k8s/ingress.tpl")

  vars = {
    elb_dns = replace(module.eks.cluster_endpoint, "https://", "")
  }
}

resource "local_file" "ingress_yaml" {
  filename = "${path.module}/../k8s/ingress.yaml"
  content  = data.template_file.ingress_template.rendered
}

resource "null_resource" "patch_and_login" {
  provisioner "local-exec" {
    command = "sh script.sh"
  }
}

resource "null_resource" "set_context" {
  provisioner "local-exec" {
    command = "kubectl config set-context --current --namespace=argocd"
  }
}


resource "null_resource" "argocd_add_repo" {
  provisioner "local-exec" {
    command = "argocd repo add https://github.com/Ki-Blog/BlogMitDashboard.git --username kpblmMik --password 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"
  }

  depends_on = [null_resource.patch_and_login]
}

resource "null_resource" "apply_argocd_manifest" {
  provisioner "local-exec" {
    command = "kubectl apply -f argocd.yml"
  }

  depends_on = [null_resource.argocd_add_repo]
}
provider "aws" {
  region = var.region
}

provider "helm" {
  kubernetes {
    
    config_path = "~/.kube/config"
  }
  
}

provider "kubernetes" {
  config_path = "~/.kube/config"
}

data "aws_availability_zones" "availibility_zones" {
  filter {
    name   = "opt-in-status"
    values = ["opt-in-not-required"]
  }
}


module "eks" {
  source = "terraform-aws-modules/eks/aws"

  cluster_name    = var.clustername
  cluster_version = "1.30"

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

resource "helm_release" "ingress_nginx" {
  name             = "ingress-nginx"
  repository       = "https://kubernetes.github.io/ingress-nginx"
  chart            = "ingress-nginx"
  namespace        = "ingress-nginx"
  create_namespace = true

    depends_on = [null_resource.helm_repo_update]
}




data "kubernetes_service" "ingress_nginx" {
metadata {
name = "ingress-nginx-controller"
namespace = "ingress-nginx"
}
depends_on = [helm_release.ingress_nginx]
}

output "ingress_nginx_controller_public_dns_ip" {
value = data.kubernetes_service.ingress_nginx.status.0.load_balancer.0.ingress.0.hostname
}

data "template_file" "ingress_template" {
  template = file("${path.module}/../k8s/ingress.tpl")

  vars = {
    elb_dns = data.kubernetes_service.ingress_nginx.status.0.load_balancer.0.ingress.0.hostname
  }

}
resource "local_file" "ingress_yaml" {
  filename = "${path.module}/../k8s/BlogDashboard-chart/templates/ingress.yaml"
  content  = data.template_file.ingress_template.rendered

  depends_on = [data.template_file.ingress_template]
}

resource "local_file" "argocd_manifest" {
  content = templatefile("${path.module}/argocd.tpl", {
    repo_url  = "https://helmchart.s3.amazonaws.com/charts"
    chart     = "BlogDashborad-chart"
    revision  = "*"
    namespace = "default"
  })
  filename = "${path.module}/argocd.yml"
}

resource "null_resource" "apply_argocd_manifest" {
  provisioner "local-exec" {
    command = "kubectl apply -f ${local_file.argocd_manifest.filename}"
  }

  provisioner "local-exec" {
    command = <<EOT
      echo "Waiting for ArgoCD to be ready..."
      kubectl wait --for=condition=ready pod -l app.kubernetes.io/component=server --namespace=argocd --timeout=600s
      echo "ArgoCD is ready. Triggering sync..."
      curl -X POST https://${var.argocd_server}/api/v1/applications/blog-dashboard/sync -H "Authorization: Bearer ${var.argocd_auth_token}"
    EOT
    when = create
  }

  triggers = {
    always_run = "${timestamp()}"
  }
}

variable "argocd_server" {
  description = "The URL of the ArgoCD server"
}

variable "argocd_auth_token" {
  description = "The authentication token for ArgoCD"
}

/* resource "null_resource" "patch_and_login" {
  provisioner "local-exec" {
    command = "sh script.sh"
  }
}

resource "null_resource" "set_context" {
  provisioner "local-exec" {
    command = <<EOT
      if [ -f $HOME/.kube/config.lock ]; then
        rm $HOME/.kube/config.lock
      fi
      kubectl config set-context --current --namespace=argocd
    EOT
    interpreter = ["bash", "-c"]
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
} */


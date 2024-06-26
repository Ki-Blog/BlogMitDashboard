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




resource "null_resource" "patch_and_login" {
  provisioner "local-exec" {
    command = "sh script.sh"
  }
}


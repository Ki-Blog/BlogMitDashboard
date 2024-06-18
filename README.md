# BlogMitDashboard1


kubectl port-forward svc/argocd-server -n argocd 8080:443
argocd admin initial-password -n argocd

aws s3 rb s3://aiq-frontend --force

Ons Ben Youssef
3:35 PM
https://cloud.mongodb.com/v2/662ede796960b0503730ec20#/clusters/detail/dbguru
Helen Haveloh
3:54 PM
https://registry.terraform.io/modules/terraform-aws-modules/eks/aws/latest?tab=outputs
Helen Haveloh
4:06 PM
Terraform EKS wollen wir die Adresse des Load Balancers als Output rausgeben
Helen Haveloh
4:12 PM
https://navyadevops.hashnode.dev/step-by-step-guide-creating-an-eks-cluster-with-alb-controller-using-terraform-modules
You
4:15 PM
afk kind abholen
Helen Haveloh
4:16 PM
https://medium.com/@helen_18602/terraform-eks-cluster-aa56ca86d6e3
Helen Haveloh
4:22 PM
kubectl get svc -n ingress-nginx
https://github.com/TS-BudgetBook/budgetbook/blob/feature/local-k8s-deployment/k8s/INSTALLATION.md
Helen Haveloh
4:23 PM
https://raw.githubusercontent.com/TS-BudgetBook/budgetbook/feature/local-k8s-deployment/k8s/INSTALLATION.md
Helen Haveloh
4:28 PM
https://github.com/TS-BudgetBook/budgetbook/blob/main/k8s/charts/budgetbook-chart/templates/ingress.yaml
Sadek Murad
4:39 PM
http://aa50bcc61fe714e919b19a38ea65a4c2-787804678.eu-central-1.elb.amazonaws.com/
Helen Haveloh
4:50 PM
checkt sonst gleich mal die logs vom ingress controller mit 
kubectl logs -n ingress-nginx <nginx-ingress-controller-pod> -f
Ansonsten löscht das Deployment nochmal und erstellt es nochmal neu und checkt die logs
ich bin gleich weg
Ansonsten schreibt mir nochmal über Google Chat wenn ihr Fragen habt :-)
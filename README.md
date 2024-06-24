# BlogMitDashboard1



kubectl port-forward svc/argocd-server -n argocd 8080:443
argocd admin initial-password -n argocd

aws s3 rb s3://aiq-frontend --force


helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace

  # Tag erstellen 
  git tag -a v1.2.8 -m "v1.2.8"
  git push origin v1.2.8

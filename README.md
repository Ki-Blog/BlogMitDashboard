# BlogMitDashboard1



kubectl port-forward svc/argocd-server -n argocd 8080:443
argocd admin initial-password -n argocd -d

aws s3 rb s3://aiq-frontend --force


helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace

  # Tag erstellen 
  git tag -a v1.2.8 -m "v1.2.8"
  git push origin v1.2.8


  helm upgrade --install aiq-release . -f values.yaml -f secrets.yaml



  kubectl create secret generic shared-secrets \
  --from-literal=MONGO="mongodb+srv://admin:XAIetDKFKKvNAxLB@dbguru.8blhy1f.mongodb.net/dbguru?retryWrites=true&w=majority&appName=dbguru" \
  --from-literal=JWT_SECRET="sdjfslgjd56fr7" \
  -n default


kubectl get secret --namespace prometheus kube-prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo


kubectl port-forward svc/kube-prometheus-stack-grafana -n prometheus 3000:80

kubectl port-forward svc/kube-prometheus-stack-prometheus -n prometheus 9090:9090

kubectl port-forward svc/kube-prometheus-stack-alertmanager -n prometheus 9093:9093



kubectl create secret tls my-tls-secret --cert=cert.pem --key=key.pem


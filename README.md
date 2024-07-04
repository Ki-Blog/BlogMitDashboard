# BlogMitDashboard1

git tag -a v1.3.0 -m "Release version 1.3.0"
git push origin v1.3.0

kubectl port-forward svc/argocd-server -n argocd 8080:443
kubectl get secret argocd-initial-admin-secret -n argocd -o jsonpath="{.data.password}" | base64 --decode

aws s3 rb s3://aiq-frontend --force


helm upgrade --install ingress-nginx ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace ingress-nginx --create-namespace

  # Tag erstellen 
  git tag -a v1.2.8 -m "v1.2.8"
  git push origin v1.2.8


  helm upgrade --install aiq-release . -f values.yaml -f secrets.yaml



kubectl get secret --namespace prometheus kube-prometheus-stack-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo


kubectl port-forward svc/kube-prometheus-stack-grafana -n prometheus 3000:80

kubectl port-forward svc/kube-prometheus-stack-prometheus -n prometheus 9090:9090

kubectl port-forward svc/kube-prometheus-stack-alertmanager -n prometheus 9093:9093



kubectl create secret tls my-tls-secret --cert=cert.pem --key=key.pem

kubectl delete job k6-load-test

kubectl create configmap k6-load-test --from-file=load-test.js --dry-run=client -o yaml | kubectl apply -f -


kubectl logs job/k6-load-test

kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml

kubectl create configmap k6-load-test --from-file=load-test.js --dry-run=client -o yaml | kubectl apply -f -

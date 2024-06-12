#!/bin/bash

set -e

NAMESPACE="argocd"

kubectl config set-context --current --namespace=$NAMESPACE

echo "Waiting for all ArgoCD pods to be ready..."
kubectl wait --for=condition=ready pod -l app.kubernetes.io/component=server --namespace=$NAMESPACE --timeout=600s
echo "All ArgoCD pods are ready."

echo "Patching the ArgoCD server service to be of type LoadBalancer..."
kubectl patch svc argocd-server -n argocd -p "{\"spec\": {\"type\": \"LoadBalancer\"}}"

sleep 60s

echo "Waiting for LoadBalancer to get an external IP or hostname..."
EXTERNAL_ENDPOINT=""
while [ -z "$EXTERNAL_ENDPOINT" ]; do
    EXTERNAL_ENDPOINT=$(kubectl get svc argocd-server -n argocd -o jsonpath="{.status.loadBalancer.ingress[0].hostname}" 2>/dev/null || \
                        kubectl get svc argocd-server -n argocd -o jsonpath="{.status.loadBalancer.ingress[0].ip}" 2>/dev/null || echo "")
    if [ -z "$EXTERNAL_ENDPOINT" ]; then
        echo "Still waiting..."
        kubectl get svc argocd-server -n argocd
        sleep 10
    fi
done
echo "External endpoint obtained: $EXTERNAL_ENDPOINT"

# Retrieve the admin password
ADMIN_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode)
if [ -z "$ADMIN_PASSWORD" ]; then
    echo "Failed to retrieve admin password"
    exit 1
fi
echo "Retrieved admin password: $ADMIN_PASSWORD"

# Log in to ArgoCD
argocd login "$EXTERNAL_ENDPOINT" --username admin --password "$ADMIN_PASSWORD"

# Save the endpoint to a file for further use
echo "$EXTERNAL_ENDPOINT" > /tmp/argocd_endpoint

#!/bin/bash

set -e

echo "Waiting for all ArgoCD pods to be ready..."
kubectl wait --for=condition=ready pods --all -n argocd --timeout=600s
echo "All ArgoCD pods are ready."

echo "Patching the ArgoCD server service to be of type LoadBalancer..."
kubectl patch svc argocd-server -n argocd -p "{\"spec\": {\"type\": \"LoadBalancer\"}}"


echo "Waiting for LoadBalancer to get an external IP..."
EXTERNAL_IP=""
while [ -z "$EXTERNAL_IP" ]; do
    EXTERNAL_IP=$(kubectl get svc argocd-server -n argocd -o jsonpath="{.status.loadBalancer.ingress[0].ip}" 2>/dev/null || echo "")
    if [ -z "$EXTERNAL_IP" ]; then
        echo "Still waiting..."
        sleep 10
    fi
done
echo "External IP obtained: $EXTERNAL_IP"

# Retrieve the admin password
ADMIN_PASSWORD=$(kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode)
if [ -z "$ADMIN_PASSWORD" ]; then
    echo "Failed to retrieve admin password"
    exit 1
fi
echo "Retrieved admin password: $ADMIN_PASSWORD"

# Log in to ArgoCD
echo "y" | argocd login "$EXTERNAL_IP" --username admin --password "$ADMIN_PASSWORD"

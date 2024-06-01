#!/bin/bash

kubectl patch svc argocd-server -n argocd -p "{\"spec\": {\"type\": \"LoadBalancer\"}}"

echo "Waiting for LoadBalancer to get an external IP..."
EXTERNAL_IP=""
while [ -z "$EXTERNAL_IP" ]; do
    EXTERNAL_IP=$(kubectl get svc argocd-server -n argocd -o jsonpath="{.status.loadBalancer.ingress[0].hostname}")
    if [ -z "$EXTERNAL_IP" ]; then
        echo "Still waiting..."
        sleep 10
    fi
done

echo "External IP obtained: $EXTERNAL_IP"

ADMIN_PASSWORD=$(argocd admin initial-password -n argocd)

echo "Retrieved admin password: $ADMIN_PASSWORD"

echo "y" | argocd login "$EXTERNAL_IP" --username admin --password "$ADMIN_PASSWORD"

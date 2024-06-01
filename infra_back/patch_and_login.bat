@echo off
kubectl patch svc argocd-server -n argocd -p "{\"spec\": {\"type\": \"LoadBalancer\"}}"

echo Waiting for LoadBalancer to get an external IP...
:wait_for_ip
kubectl get svc argocd-server -n argocd -o jsonpath="{.status.loadBalancer.ingress[0].hostname}" > external_ip.txt
set /p EXTERNAL_IP=<external_ip.txt

if "%EXTERNAL_IP%"=="" (
    echo Still waiting...
    timeout /t 10 >nul
    goto wait_for_ip
)

echo External IP obtained: %EXTERNAL_IP%

argocd admin initial-password -n argocd > password.txt
set /p ADMIN_PASSWORD=<password.txt

echo Retrieved admin password: %ADMIN_PASSWORD%

echo y | argocd login %EXTERNAL_IP% --username admin --password %ADMIN_PASSWORD% /B

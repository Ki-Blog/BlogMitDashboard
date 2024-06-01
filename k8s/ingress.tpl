# https://kubernetes.io/docs/concepts/services-networking/ingress/
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: aiq-ingress
  namespace: default
spec:
  ingressClassName: nginx
  rules:
    - host: "${lower(elb_dns)}"
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: aiq-frontend
                port:
                  number: 80
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: aiq-backend
                port:
                  number: 3000

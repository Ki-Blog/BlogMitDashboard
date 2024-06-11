apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: aiq-ingress
  namespace: default
spec:
  ingressClassName: nginx
  tls:
    - hosts:
        - "${lower(elb_dns)}"
      secretName: aiq-tls-secret
  rules:
    - host: "${lower(elb_dns)}"
      http:
        paths:
          - path: /api/auth
            pathType: Prefix
            backend:
              service:
                name: auth
                port:
                  number: 4000
          - path: /api/post
            pathType: Prefix
            backend:
              service:
                name: post
                port:
                  number: 4003
          - path: /api/user
            pathType: Prefix
            backend:
              service:
                name: user
                port:
                  number: 4001
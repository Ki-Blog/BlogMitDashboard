provider "aws" {
  region = var.region
}

resource "aws_api_gateway_rest_api" "my_api" {
  name        = "MyAPI"
  description = "API for accessing backend services"
}

resource "aws_api_gateway_resource" "auth_resource" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  parent_id   = aws_api_gateway_rest_api.my_api.root_resource_id
  path_part   = "api/auth"
}

resource "aws_api_gateway_resource" "post_resource" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  parent_id   = aws_api_gateway_rest_api.my_api.root_resource_id
  path_part   = "api/post"
}

resource "aws_api_gateway_resource" "user_resource" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  parent_id   = aws_api_gateway_rest_api.my_api.root_resource_id
  path_part   = "api/user"
}

resource "aws_api_gateway_resource" "comment_resource" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  parent_id   = aws_api_gateway_rest_api.my_api.root_resource_id
  path_part   = "api/comment"
}

resource "aws_api_gateway_method" "auth_method" {
  rest_api_id   = aws_api_gateway_rest_api.my_api.id
  resource_id   = aws_api_gateway_resource.auth_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "post_method" {
  rest_api_id   = aws_api_gateway_rest_api.my_api.id
  resource_id   = aws_api_gateway_resource.post_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "user_method" {
  rest_api_id   = aws_api_gateway_rest_api.my_api.id
  resource_id   = aws_api_gateway_resource.user_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

resource "aws_api_gateway_method" "comment_method" {
  rest_api_id   = aws_api_gateway_rest_api.my_api.id
  resource_id   = aws_api_gateway_resource.comment_resource.id
  http_method   = "ANY"
  authorization = "NONE"
}

data "kubernetes_service" "ingress_nginx" {
  metadata {
    name      = "ingress-nginx-controller"
    namespace = "ingress-nginx"
  }
  depends_on = [helm_release.ingress_nginx]
}

resource "aws_api_gateway_integration" "auth_integration" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_resource.auth_resource.id
  http_method = aws_api_gateway_method.auth_method.http_method
  type        = "HTTP"

  integration_http_method = "ANY"
  uri                     = "http://${data.kubernetes_service.ingress_nginx.status[0].load_balancer.ingress[0].hostname}/api/auth"
}

resource "aws_api_gateway_integration" "post_integration" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_resource.post_resource.id
  http_method = aws_api_gateway_method.post_method.http_method
  type        = "HTTP"

  integration_http_method = "ANY"
  uri                     = "http://${data.kubernetes_service.ingress_nginx.status[0].load_balancer.ingress[0].hostname}/api/post"
}

resource "aws_api_gateway_integration" "user_integration" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_resource.user_resource.id
  http_method = aws_api_gateway_method.user_method.http_method
  type        = "HTTP"

  integration_http_method = "ANY"
  uri                     = "http://${data.kubernetes_service.ingress_nginx.status[0].load_balancer.ingress[0].hostname}/api/user"
}

resource "aws_api_gateway_integration" "comment_integration" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_resource.comment_resource.id
  http_method = aws_api_gateway_method.comment_method.http_method
  type        = "HTTP"

  integration_http_method = "ANY"
  uri                     = "http://${data.kubernetes_service.ingress_nginx.status[0].load_balancer.ingress[0].hostname}/api/comment"
}

resource "aws_api_gateway_method_response" "auth_response" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_resource.auth_resource.id
  http_method = aws_api_gateway_method.auth_method.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Headers" = true
  }
}

resource "aws_api_gateway_method_response" "post_response" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_resource.post_resource.id
  http_method = aws_api_gateway_method.post_method.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Headers" = true
  }
}

resource "aws_api_gateway_method_response" "user_response" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_resource.user_resource.id
  http_method = aws_api_gateway_method.user_method.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Headers" = true
  }
}

resource "aws_api_gateway_method_response" "comment_response" {
  rest_api_id = aws_api_gateway_rest_api.my_api.id
  resource_id = aws_api_gateway_resource.comment_resource.id
  http_method = aws_api_gateway_method.comment_method.http_method
  status_code = "200"

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Headers" = true
  }
}

resource "aws_api_gateway_integration_response" "auth_integration_response" {
  rest_api_id         = aws_api_gateway_rest_api.my_api.id
  resource_id         = aws_api_gateway_resource.auth_resource.id
  http_method         = aws_api_gateway_method.auth_method.http_method
  status_code         = aws_api_gateway_method_response.auth_response.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
    "method.response.header.Access-Control-Allow-Methods" = "'*'"
    "method.response.header.Access-Control-Allow-Headers" = "'*'"
  }
}

resource "aws_api_gateway_integration_response" "post_integration_response" {
  rest_api_id         = aws_api_gateway_rest_api.my_api.id
  resource_id         = aws_api_gateway_resource.post_resource.id
  http_method         = aws_api_gateway_method.post_method.http_method
  status_code         = aws_api_gateway_method_response.post_response.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
    "method.response.header.Access-Control-Allow-Methods" = "'*'"
    "method.response.header.Access-Control-Allow-Headers" = "'*'"
  }
}

resource "aws_api_gateway_integration_response" "user_integration_response" {
  rest_api_id         = aws_api_gateway_rest_api.my_api.id
  resource_id         = aws_api_gateway_resource.user_resource.id
  http_method         = aws_api_gateway_method.user_method.http_method
  status_code         = aws_api_gateway_method_response.user_response.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
    "method.response.header.Access-Control-Allow-Methods" = "'*'"
    "method.response.header.Access-Control-Allow-Headers" = "'*'"
  }
}

resource "aws_api_gateway_integration_response" "comment_integration_response" {
  rest_api_id         = aws_api_gateway_rest_api.my_api.id
  resource_id         = aws_api_gateway_resource.comment_resource.id
  http_method         = aws_api_gateway_method.comment_method.http_method
  status_code         = aws_api_gateway_method_response.comment_response.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Origin" = "'*'"
    "method.response.header.Access-Control-Allow-Methods" = "'*'"
    "method.response.header.Access-Control-Allow-Headers" = "'*'"
  }
}

resource "aws_api_gateway_deployment" "api_deployment" {
  depends_on = [
    aws_api_gateway_integration.auth_integration,
    aws_api_gateway_integration.post_integration,
    aws_api_gateway_integration.user_integration,
    aws_api_gateway_integration.comment_integration,
    aws_api_gateway_method_response.auth_response,
    aws_api_gateway_method_response.post_response,
    aws_api_gateway_method_response.user_response,
    aws_api_gateway_method_response.comment_response,
    aws_api_gateway_integration_response.auth_integration_response,
    aws_api_gateway_integration_response.post_integration_response,
    aws_api_gateway_integration_response.user_integration_response,
    aws_api_gateway_integration_response.comment_integration_response,
  ]

  rest_api_id = aws_api_gateway_rest_api.my_api.id
  stage_name  = "prod"
}

module "apigateway" {
  source = "./apigateway"
}
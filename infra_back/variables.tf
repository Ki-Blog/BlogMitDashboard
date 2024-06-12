variable "region" {
  description = "Default AWS Region"
  type        = string
  default     = "eu-central-1"
}

variable "clustername" {
  description = "aiq-eks"
  type        = string
  default     = "aiq-eks"
}

variable "aws_access_key" {
  description = "AWS_ACCESS_KEY_ID"
  type        = string
}

variable "aws_secret_key" {
  description = "AWS_SECRET_ACCESS_KEY"
  type        = string
}

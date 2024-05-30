provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "react_app_bucket" {
  bucket = "aiquantum-bucket"
  force_destroy = true

  tags = {
    Name        = "ReactAppBucket"
    Environment = "Production"
  }
}
resource "aws_s3_bucket_acl" "bucket_acl" {
  bucket = aws_s3_bucket.react_app_bucket.bucket
  acl    = "private"
}

output "bucket_url" {
  value = aws_s3_bucket.react_app_bucket.bucket_regional_domain_name
}
provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "react_app_bucket" {
  bucket = "aiquantum-bucket" # This is the actual name of the S3 bucket on AWS
  acl    = "public-read"

  tags = {
    Name        = "ReactAppBucket"
    Environment = "Production"
  }
}

output "bucket_url" {
  value = aws_s3_bucket.react_app_bucket.bucket_regional_domain_name
}
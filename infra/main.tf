terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "5.48.0"
    }
  }
}

resource "aws_s3_bucket" "aiq" {
  bucket = "aiq-frontend"
}

resource "aws_s3_bucket_ownership_controls" "example" {
  bucket = aws_s3_bucket.aiq.id
  rule {
    object_ownership = "BucketOwnerPreferred"
  }
}

resource "aws_s3_bucket_public_access_block" "example" {
  bucket = aws_s3_bucket.aiq.id

  block_public_acls       = false
  block_public_policy     = false
  ignore_public_acls      = false
  restrict_public_buckets = false
}

resource "aws_s3_bucket_acl" "example" {
  depends_on = [
    aws_s3_bucket_ownership_controls.example,
    aws_s3_bucket_public_access_block.example,
  ]

  bucket = aws_s3_bucket.aiq.id
  acl    = "public-read"
}

resource "aws_s3_bucket_policy" "host_bucket_policy" {
  bucket = aws_s3_bucket.aiq.id

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : "*",
        "Action" : "s3:GetObject",
        "Resource": "arn:aws:s3:::aiq-frontend/*"
      }
    ]
  })
}

resource "aws_s3_bucket_website_configuration" "web-config" {
  bucket = aws_s3_bucket.aiq.id

  index_document {
    suffix = "index.html"
  }
}

output "website_url" {
    description = "My website URL"
    value = aws_s3_bucket_website_configuration.web-config.website_endpoint
}

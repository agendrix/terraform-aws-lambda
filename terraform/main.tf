locals {
  zip_path = "${path.module}/lambda.zip"
}

resource "aws_lambda_function" "lambda" {
  filename      = local.zip_path
  function_name = var.lambda_name
  role          = var.role_arn
  handler       = "index.handler"

  source_code_hash = filebase64sha256(local.zip_path)

  runtime = "nodejs12.x"

  environment {
    variables = {}
  }
}

resource "aws_cloudwatch_log_group" "log_group" {
  name              = "/aws/lambda/${aws_lambda_function.lambda.function_name}"
  retention_in_days = 14
}

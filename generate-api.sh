#!/bin/bash

# Check if LAMBDA_URI is set
if [ -z "$LAMBDA_URI" ]; then
  echo "Please export LAMBDA_URI before running this script."
  echo "Example:"
  echo "  export LAMBDA_URI='arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:xxxx:function:UserService/invocations'"
  exit 1
fi

# Generate api.yaml from template
envsubst < api.template.yaml > api.yaml
echo "Generated api.yaml from template"

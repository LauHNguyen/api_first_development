#!/bin/bash

# Check if LAMBDA_URI is set
if [ -z "$LAMBDA_URI" ]; then
  echo "Please export LAMBDA_URI before running this script."
  exit 1
fi

# Generate api.yaml from template
envsubst < api.template.yaml > api.yaml
echo "Generated api.yaml from template"

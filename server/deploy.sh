echo '*** Package ***'
aws cloudformation package --template-file app-sam.yaml --s3-bucket public-bikes-dev --output-template-file app-sam-output.yaml

echo '*** Deploy ***'
aws cloudformation deploy --template-file app-sam-output.yaml --stack-name public-bikes-dev --capabilities CAPABILITY_IAM

echo '*** FINISHED ***'

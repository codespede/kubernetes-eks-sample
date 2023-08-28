Steps to deploy:
- Install `kubectl` and `eksctl` on your local.
- Create K8S cluster:`eksctl create cluster --name YOUR_CLUSTER_NAME --version 1.23 --fargate`
- Associate IAM OpenID Connect Provider with the cluster: `eksctl utils associate-iam-oidc-provider --cluster YOUR_CLUSTER_NAME --approve`
- Create IAM Policy for Load Balancer: `aws iam create-policy --policy-name AWSLoadBalancerControllerIAMPolicy --policy-document file://iam_policy.json`
- Create a Service Account for the Cluster: eksctl create iamserviceaccount --cluster=YOUR_CLUSTER_NAME --namespace=kube-system --name=aws-load-balancer-controller --attach-policy-arn=arn:aws:iam::<AWS_ACCOUNT_ID>:policy/AWSLoadBalancerControllerIAMPolicy --override-existing-serviceaccounts --approve`
- Install `helm`
- Add the EKS's repo onto helm: `helm repo add eks https://aws.github.io/eks-charts`
- Install TargetGroup binding custom CRDs: `kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller//crds?ref=master"`
- Install the Helm Chart for AWS Load Balancer Controller: `helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
    --set clusterName=YOUR_CLUSTER_NAME
    --set serviceAccount.create=false
    --set region=YOUR_REGION_CODE
    --set vpcId=<VPC_ID>
    --set serviceAccount.name=aws-load-balancer-controller
    -n kube-system`
- Create a Fargate profile for the app: `eksctl create fargateprofile --cluster your-cluster --region your-region-code --name your-alb-sample-app --namespace eks-sample`
- Deploy the app onto the EKS Cluster: `kubectl apply -f infra/k8s/deployment_full.yaml`
- After a few minutes, check if the Ingress Controller is up: `kubectl get ingress -n eks-sample`
- The following should be the output:

 `NAME           CLASS    HOSTS   ADDRESS                                                                   PORTS   AGE
ingress-2048   <none>   *       k8s-eks-sample-ingress2-xxxxxxxxxx-yyyyyyyyyy.us-east-2.elb.amazonaws.com   80      2m32s`

- Tada! You can access your MicroServices app in the URL starting with 'k8s..'!
- You can configure additional services by adding Deployments and Services in the `deployment_full.yaml` and configuring the 'Ingress' section with its service routing.

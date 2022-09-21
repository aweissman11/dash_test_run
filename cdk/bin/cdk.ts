#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import type { WebAppStackProps } from "@deptdash/cdk-webapp";
import { WebAppStack, BastionStack } from "@deptdash/cdk-webapp";
import type { Environment } from "aws-cdk-lib";
import { ContainerImage } from "aws-cdk-lib/aws-ecs";
import * as path from "path";
const mainProjectPackage = require("../../package.json");

// TODO: update remix.init/index.js to set this at clone-time.
// We should avoid assuming the account is ours.
// Get account number by running `aws sts get-caller-identity`
const env: Environment = {
  account: "320049641071",
  region: "us-west-1",
};

const projectName = "test_run";
if (mainProjectPackage.name !== projectName) {
  console.error(
    `It looks like you've changed the name of your project in package.json. ` +
      `The package.json name is assumed to match the CDK stack name, as that's ` +
      `how the main.yml file figures out which stack to deploy for which branch. ` +
      `Delete this check if you know what you're doing, but be sure you've updated ` +
      `.github/workflows/main.yml`
  );
  process.exit(1);
}
const app = new cdk.App();

// Staging stage
const stagingProps: WebAppStackProps = {
  env,
  projectName,
  stage: "staging",
  database: true,
  image: ContainerImage.fromAsset(path.resolve(__dirname, "../..")),

  // replace these values with a domain you own, or use manual certificate validation
  certificateValidation: "route53",
  route53HostedZoneDomain: "deptdxp.com",
  domainName: "staging.test-run.deptdxp.com",
  allowedHeaders: ["accept-language", "X-Algolia-API-Key"],
};
new WebAppStack(app, `DeptDash-test_run-staging`, stagingProps);
// create a bastion host in a separate stack, so it can be torn down
// when not in use.
new BastionStack(app, `DeptDash-test_run-staging-bastion`, stagingProps);

// Prod stage
const prodProps: WebAppStackProps = {
  env,
  projectName,
  stage: "production",
  database: true,
  image: ContainerImage.fromAsset(path.resolve(__dirname, "../..")),

  // replace these values with a domain you own, or use manual certificate validation
  certificateValidation: "route53",
  route53HostedZoneDomain: "deptdxp.com",
  domainName: "test-run.deptdxp.com",
  allowedHeaders: ["X-Algolia-API-Key"],
};

new WebAppStack(app, `DeptDash-test_run-production`, prodProps);
// create a bastion host in a separate stack, so it can be torn down
// when not in use.
new BastionStack(app, `DeptDash-test_run-production-bastion`, prodProps);

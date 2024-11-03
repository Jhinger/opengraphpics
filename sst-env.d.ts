/* This file is auto-generated by SST. Do not edit. */
/* tslint:disable */
/* eslint-disable */
/* deno-fmt-ignore-file */
import "sst"
export {}
declare module "sst" {
  export interface Resource {
    "GoogleClientId": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "GoogleClientSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "JwtSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "OpenGraphPicsApp": {
      "type": "sst.aws.SvelteKit"
      "url": string
    }
    "OpenGraphPicsBucket": {
      "name": string
      "type": "sst.aws.Bucket"
    }
    "OpenGraphPicsDB": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
    "OpenGraphPicsDistributionRouter": {
      "type": "sst.aws.Router"
      "url": string
    }
    "OpenGraphPicsQueue": {
      "type": "sst.aws.Queue"
      "url": string
    }
    "StripeSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
    "StripeWebhookSecret": {
      "type": "sst.sst.Secret"
      "value": string
    }
  }
}

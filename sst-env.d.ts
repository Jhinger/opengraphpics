/* tslint:disable */
/* eslint-disable */
import "sst"
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
    "OpenGraphPicsDB": {
      "name": string
      "type": "sst.aws.Dynamo"
    }
  }
}
export {}

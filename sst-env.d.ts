/* tslint:disable */
/* eslint-disable */
import "sst"
declare module "sst" {
  export interface Resource {
    "ByteBiteWebApp": {
      "type": "sst.aws.SvelteKit"
      "url": string
    }
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
  }
}
export {}

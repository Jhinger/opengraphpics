/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'opengraphpics',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
			providers: {
				aws: {
					region: 'us-east-2'
				}
			}
		};
	},
	async run() {
		const googleClientId = new sst.Secret('GoogleClientId');
		const googleClientSecret = new sst.Secret('GoogleClientSecret');
		const jwtSecret = new sst.Secret('JwtSecret');
		const stripeSecret = new sst.Secret('StripeSecret');
		const stripeWebhookSecret = new sst.Secret('StripeWebhookSecret');

		const bucket = new sst.aws.Bucket('OpenGraphPicsBucket', {
			access: 'cloudfront',
			transform: {
				bucket: (args) => {
					args.forceDestroy = $app.stage !== 'production';
				}
			}
		});
		new aws.s3.BucketVersioningV2('OpenGraphPicsBucketVersioning', {
			bucket: bucket.name,
			versioningConfiguration: {
				status: 'Enabled'
			}
		});

		const db = new sst.aws.Dynamo('OpenGraphPicsDB', {
			fields: {
				pk: 'string',
				sk: 'string'
			},
			primaryIndex: { hashKey: 'pk', rangeKey: 'sk' }
		});

		const app = new sst.aws.SvelteKit('OpenGraphPicsApp', {
			link: [
				db,
				bucket,
				googleClientId,
				googleClientSecret,
				jwtSecret,
				stripeSecret,
				stripeWebhookSecret
			]
		});

		const router = new sst.aws.Router('OpenGraphPicsDistributionRouter', {
			routes: {
				'/*': app.url,
				'/assets/*': {
					bucket: bucket,
					rewrite: {
						regex: '^/assets/(.*)$',
						to: '/$1'
					}
				}
			}
		});

		return {
			router: router.url
		};
	}
});

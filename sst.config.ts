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

		const db = new sst.aws.Dynamo('OpenGraphPicsDB', {
			fields: {
				pk: 'string',
				sk: 'string'
			},
			primaryIndex: { hashKey: 'pk', rangeKey: 'sk' }
		});

		new sst.aws.SvelteKit('OpenGraphPicsApp', {
			link: [db, googleClientId, googleClientSecret, jwtSecret]
		});
	}
});

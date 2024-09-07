/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'bytebite',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws'
		};
	},
	async run() {
		const googleClientId = new sst.Secret('GoogleClientId');
		const googleClientSecret = new sst.Secret('GoogleClientSecret');
		const jwtSecret = new sst.Secret('JwtSecret');

		new sst.aws.SvelteKit('ByteBiteWebApp', {
			link: [googleClientId, googleClientSecret]
		});
	}
});

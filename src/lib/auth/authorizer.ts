import { Resource } from 'sst';
import jsonwebtoken from 'jsonwebtoken';
import type { Cookies, redirect } from '@sveltejs/kit';

export class Authorizer {
	private readonly user?: any;

	constructor(cookies: Cookies) {
		const token = cookies.get('access_token');
		if (!token) return;

		try {
			this.user = jsonwebtoken.verify(token, Resource.JwtSecret.value, {
				algorithms: ['HS256'],
				complete: true
			}).payload;
		} catch (err) {
			this.user = null;
		}
	}
}

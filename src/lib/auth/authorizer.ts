import { Resource } from 'sst';
import jsonwebtoken from 'jsonwebtoken';
import { redirect } from '@sveltejs/kit';
import type { JwtPayload } from 'jsonwebtoken';
import type { Cookies } from '@sveltejs/kit';
import type { Maybe, User } from '$types';

export class Authorizer {
	private readonly decrypted_user?: Maybe<JwtPayload | User>;

	constructor(cookies: Cookies) {
		const token = cookies.get('user_token');
		if (!token) {
			this.decrypted_user = null;
			return;
		}

		try {
			this.decrypted_user =
				(jsonwebtoken.verify(token, Resource.JwtSecret.value, {
					algorithms: ['HS256'],
					complete: true
				}).payload as JwtPayload | User) ?? null;
		} catch (err) {
			this.decrypted_user = null;
		}
	}

	get user() {
		return this.decrypted_user;
	}

	isAuthenticated() {
		if (this.decrypted_user === undefined || this.decrypted_user === null) {
			redirect(302, '/login');
		}
		return this;
	}

	// TODO: Implement the roles that can exist.
	isAdmin() {}
	hasRole(role: string) {}
}

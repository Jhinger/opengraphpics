import 'jsonwebtoken';

declare module 'jsonwebtoken' {
	export interface JwtPayload {
		userId: string;
		name: string;
		avatar_url: string;
		organizations: string[];
	}
}

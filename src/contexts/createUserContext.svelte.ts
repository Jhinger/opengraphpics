import type { User, Maybe } from '$types';

export default function createUserContext(u: User | null) {
	const user = $state({
		email: u?.email ?? '',
		name: u?.name ?? '',
		picture: u?.picture ?? '',
		organizations: u?.organizations ?? []
	});

	return {
		get email() {
			return user.email;
		},
		get name() {
			return user.name;
		},
		get picture() {
			return user.picture;
		},
		get organizations() {
			return user.organizations;
		},
		set user(u: User | null) {
			user.email = u?.email ?? '';
			user.name = u?.name ?? '';
			user.picture = u?.picture ?? '';
			user.organizations = u?.organizations ?? [];
		}
	};
}

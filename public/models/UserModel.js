import Http from '../services/Http';
import { SERVER_API_PATH } from '../services/Settings';

export const UserRole = {
	User: 0,
	Admin: 1
};

class UserModel {
	getProfile() {
		return Http.fetchGet({
			path: '/profile'
		})
		.then(response => response.json());
	}

	getProfileByNickname(nickname) {
		return Http.fetchGet({
			path: `/users/${nickname}`
		})
		.then(response => response.json());
	}

	updateProfileInfo({email = '', nickname = '' } = {}) {
		return Http.fetchPut({
			path: '/profile',
			body: JSON.stringify({'nickname': nickname, 'email': email})
		})
		.then(response => response.json());
	}

	updateProfilePassword({
			oldPassword = '',
			password = '',
			passwordConfirm = ''} = {}) {
		return Http.fetchPost({
			path: '/profile/password',
			body: JSON.stringify({
				'old_password': oldPassword,
				'password': password,
				'password_confirmation': passwordConfirm
			})
		})
		.then(response => response.json());
	}

	uploadAvatar(file) {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('name', file.name);

		return fetch(`${SERVER_API_PATH}/profile/avatar`, {
			method: 'PUT',
			credentials: 'include',
			mode: 'cors',
			body: formData
		})
		.then(response => response.json());
	}

	getSubscriptions(id, count, offset) {
		return Http.fetchGet({
			path: `/users/${id}/subscriptions?count=${count}&offset=${offset}`
		})
		.then(response => response.json());
	}

	getPlaylists(id, count, offset) {
		return Http.fetchGet({
			path: `/users/${id}/playlists?count=${count}&offset=${offset}`
		})
		.then(response => response.json());
	}

}

export default new UserModel();

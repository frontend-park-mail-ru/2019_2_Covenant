import HttpModule from '../services/Http';
import { SERVER_API_PATH } from '../services/Settings';

const Http = new HttpModule();

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
		formData.append('avatar', file);
		formData.append('name', file.name);

		return fetch(`${SERVER_API_PATH}/profile/avatar`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			body: formData
		})
		.then(response => response.json());
	}
}

export default new UserModel();

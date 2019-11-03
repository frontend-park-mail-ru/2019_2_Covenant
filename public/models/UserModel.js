import HttpModule from '../services/Http';

const Http = new HttpModule();

class UserModel {
	getProfile() {
		return Http.fetchGet({
			path: '/profile'
		})
		.then(response => response.json());
	}

	updateProfile(name) {
		return Http.fetchPost({
			path: '/profile',
			body: JSON.stringify({'name': name})
		})
		.then(response => response.json());
	}

	uploadAvatar(file) {
		const formData = new FormData();
		formData.append('avatar', file);
		formData.append('name', file.name);

		return fetch('/api/upload/avatar', {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			body: formData
		})
		.then(response => response.json());
	}
}

export default new UserModel();

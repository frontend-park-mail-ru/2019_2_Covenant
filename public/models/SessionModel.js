import Http from '../services/Http';

class SessionModel {
	login(form) {
		return Http.fetchPost({
			path: '/session',
			body: JSON.stringify({...form})
		})
		.then(response => response.json());
	}

	signUp(form) {
		return Http.fetchPost({
			path: '/users',
			body: JSON.stringify({...form})
		})
		.then(response => response.json());
	}

	logOut() {
		return Http.fetchDelete({
			path: '/session'
		})
		.then(response => response.json());
	}
}

export default new SessionModel();

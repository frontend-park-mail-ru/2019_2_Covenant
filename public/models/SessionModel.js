import HttpModule from '../services/Http';

const Http = new HttpModule();

class SessionModel {
	login(form) {
		return Http.fetchPost({
			path: '/login',
			body: JSON.stringify({...form})
		})
		.then(response => response.json());
	}

	signUp(form) {
		return Http.fetchPost({
			path: '/signup',
			body: JSON.stringify({...form})
		})
		.then(response => response.json());
	}

	logOut() {
		return Http.fetchGet({
			path: '/logout'
		})
		.then(response => response.json());
	}
}

export default new SessionModel();

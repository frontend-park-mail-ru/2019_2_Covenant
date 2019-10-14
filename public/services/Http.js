'use strict';

class Http {
	constructor(){
		this.baseUrl = 'http://localhost:3000';
	}

	fetchGet({ path }) {
		return this.fetchRequest({
			method: 'GET',
			path: path
		});
	}

	fetchPost({ path, body }) {
		return this.fetchRequest({
			method: 'POST',
			path: path,
			body: body
		});
	}

	fetchRequest( { path = '/',
				method = 'GET',
				body = null }) {
		const obj = {
			method: method,
			mode: 'cors',
			credentials: 'include'
		};
		if (body != null) {
			obj.headers = {
				'Content-Type': 'application/json'
			};
			obj.body = body;
		}

		return fetch(path, obj);
	}
}

export default Http;

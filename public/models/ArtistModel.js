import HttpModule from '../services/Http';
import {SERVER_API_PATH} from '../services/Settings';

const Http = new HttpModule();

class ArtistModel {
	createArtist({name = '', file = ''} = {}) {
		return Http.fetchPost({
			path: '/artists',
			body: JSON.stringify({name: name})
		})
		.then(response => response.json())
		.then(response => {
			const id = response.body.artist.id;
			return this.uploadPhoto(id, file);
		});
	}

	uploadPhoto(id, file) {
		const formData = new FormData();
		formData.append('file', file);

		return fetch(`${SERVER_API_PATH}/artists/${id}/photo`, {
			method: 'PUT',
			credentials: 'include',
			mode: 'cors',
			body: formData
		})
		.then(response => response.json());
	}

	getArtist(id) {
		return Http.fetchGet({
			path: `/artists/${id}`
		})
		.then(response => response.json());
	}

	deleteArtist(id) {
		return Http.fetchDelete({
			path: `/artists/${id}`
		})
		.then(response => response.json());
	}

	updateArtist({
		id = '',
		name = '' }) {
		return Http.fetchPut({
			path: `/artists/${id}`,
			body: JSON.stringify({name: name})
		})
		.then(response => response.json());
	}

	getArtists(count, offset) {
		return Http.fetchGet({
			path: `/artists?count=${count}&offset=${offset}`
		})
		.then(response => response.json());
	}
}

export default new ArtistModel();
import HttpModule from '../services/Http';

const Http = new HttpModule();

class ArtistModel {
	createArtist(name) {
		return Http.fetchPost({
			path: '/artists',
			body: JSON.stringify({name: name})
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
import HttpModule from '../services/Http';

const Http = new HttpModule();

class AlbumModel {
	getAlbum(id) {
		return Http.fetchGet({
			path: `/albums/${id}`
		})
		.then(response => response.json());
	}

	getAlbums(count, offset) {
		return Http.fetchGet({
			path: `/albums?count=${count}&offset=${offset}`
		})
		.then(response => response.json());
	}

	createAlbum({
		artistId = '',
		name = '',
		year = '' } = {}) {
		return Http.fetchPost({
			path: `/artists/${artistId}/albums`,
			body: JSON.stringify({
				artistId: artistId,
				name: name,
				year: year
			})
		})
		.then(response => response.json());
	}

	updateAlbum({
		id = '',
		artistId = '',
		name = '',
		year = '' } = {}) {
		return Http.fetchPut({
			path: `/albums/${id}`,
			body: JSON.stringify({
				artist_id: artistId,
				name: name,
				year: year
			})
		})
		.then(response => response.json());
	}

	deleteAlbum(id) {
		return Http.fetchDelete({
			path: `/albums/${id}`,
		})
		.then(response => response.json());
	}
}

export default new AlbumModel();
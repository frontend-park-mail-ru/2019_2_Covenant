import HttpModule from '../services/Http';

const Http = new HttpModule();

class TrackModel {
	popular() {
		return Http.fetchGet({
			path: '/tracks/popular'
		})
		.then(response => response.json());
	}

	favourites() {
		return Http.fetchGet({
			path: '/tracks/favourite'
		})
		.then(response => response.json());
	}

	addToFavourites(id) {
		return Http.fetchPost({
			path: '/tracks/favourite',
			body: JSON.stringify({ track_id: id })
		})
		.then(response => response.json());
	}

	removeFromFavourites(id) {
		return Http.fetchDelete({
			path: '/tracks/favourite',
			body: JSON.stringify({ track_id: id })
		})
		.then(response => response.json());
	}
}

export default new TrackModel();

import Http from '../services/Http';
import {SERVER_API_PATH} from '../services/Settings';

class TrackModel {
	getPopular(count, offset) {
		return Http.fetchGet({
			path: `/tracks/popular?count=${count}&offset=${offset}`
		})
		.then(response => response.json());
	}

	createTrack({
		id = '', name = '' , file = ''}) {
		const formData = new FormData();
		formData.append('request', JSON.stringify({name: name}));
		formData.append('file', file);

		return fetch(`${SERVER_API_PATH}/albums/${id}/tracks`, {
			method: 'POST',
			credentials: 'include',
			mode: 'cors',
			body: formData
		})
		.then(response => response.json());
	}

	favourites(count, offset) {
		return Http.fetchGet({
			path: `/tracks/favourite?count=${count}&offset=${offset}`
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

import Http from '../services/Http';

class LikeModel {
	like(track_id) {
		return Http.fetchPost({
			path: '/likes',
			body: JSON.stringify({track_id: track_id})
		})
		.then(response => response.json());
	}

	dislike(track_id) {
		return Http.fetchDelete({
			path: '/likes',
			body: JSON.stringify({track_id: track_id})
		})
		.then(response => response.json());
	}
}

export default new LikeModel();
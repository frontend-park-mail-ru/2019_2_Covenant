import Http from '../services/Http';

class PlaylistModel {
	getPlaylists(count, offset) {
		return Http.fetchGet({
			path: `/playlists?count=${count}&offset=${offset}`
		})
		.then(response => response.json());
	}

	getPlaylist(id) {
		return Http.fetchGet({
			path: `/playlists/${id}`
		})
		.then(response => response.json());
	}

	getTracksFromPlaylist(id) {
		return Http.fetchGet({
			path: `/playlists/${id}/tracks`
		})
		.then(response => response.json());
	}

	createPlaylist({
		name = '',
		description = '' } = {}) {
		return Http.fetchPost({
			path: '/playlists',
			body: JSON.stringify({
				name: name,
				description: description
			})
		})
		.then(response => response.json());
	}

	deletePlaylist(id) {
		return Http.fetchDelete({
			path: `/playlists/${id}`
		})
		.then(response => response.json());
	}

	addToPlaylist({trackId = '', playlistId = ''} = {}) {
		return Http.fetchPost({
			path: `/playlists/${playlistId}/tracks`,
			body: JSON.stringify({
				track_id: trackId
			})
		})
		.then(response => response.json());
	}

	removeFromPlaylist({trackId = '', playlistId = ''} = {}) {
		return Http.fetchDelete({
			path: `/playlists/${playlistId}/tracks/${trackId}`
		})
		.then(response => response.json());
	}
}

export default new PlaylistModel();
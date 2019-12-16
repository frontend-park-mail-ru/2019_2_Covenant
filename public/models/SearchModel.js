import Http from '../services/Http';

class SearchModel {
	search(text) {
		return Http.fetchGet({
			path: `/search?s=${text}`
		})
		.then(response => response.json());
	}
}

export default new SearchModel();
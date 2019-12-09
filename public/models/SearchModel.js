import HttpModule from '../services/Http';

const Http = new HttpModule();

class SearchModel {
	search(text) {
		return Http.fetchGet({
			path: `/search?s=${text}`
		})
		.then(response => response.json());
	}
}

export default new SearchModel();
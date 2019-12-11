import HttpModule from '../services/Http';

const Http = new HttpModule();

class CollectionModel {
	createCollection({
		name=  '',
		photo = {}} = {}) {
		return Http.fetchPost({
			path: '',
			body: JSON.stringify({name: name, photo: photo})
		})
		.then(response => response.json());
	}

	getCollections(count, offset) {
		return Http.fetchGet({
			path: `/collections?count=${count}&offset=${offset}`
		})
		.then(response => response.json());
	}
}

export default new CollectionModel();
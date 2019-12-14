import Urls from '../../../services/Urls';
import AlbumModel from '../../../models/AlbumModel';
import template from './Album.pug';
import CardItem from '../../../common/Content/CardItem/CardItem';

class Album extends CardItem {
	constructor() {
		super({
			path: Urls.AlbumURl,
			template: template
		});
	}

	loadItem(id) {
		const albumPromise =  AlbumModel.getAlbum(id);
		const tracksPromise = AlbumModel.getTracks(id);

		return Promise.all([albumPromise, tracksPromise]);
	}
}

export default Album;
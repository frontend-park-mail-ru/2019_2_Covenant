import CardList from '../../../common/Content/CardList/CardList';
import template from './AlbumList.pug';
import AlbumModel from '../../../models/AlbumModel';
import {formatServerRootForArray} from '../../../services/Utils';

class AlbumList extends CardList {
	constructor() {
		super({
			template: template,
			itemsName: 'albums'
		});
	}

	loadItems(count, offset) {
		return AlbumModel.getAlbums(count, offset)
			.then(response => {
				formatServerRootForArray(response.body.albums, 'photo');
				return response;
			});
	}
}

export default AlbumList;
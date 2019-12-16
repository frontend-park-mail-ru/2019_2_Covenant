import template from './Artists.pug';
import CardList from '../../../common/Content/CardList/CardList';
import ArtistModel from '../../../models/ArtistModel';
import {formatServerRootForArray} from '../../../services/Utils';

class Artists extends CardList {
	constructor() {
		super({
			template: template,
			itemsName: 'artists'
		});
	}

	loadItems(count, offset) {
		return ArtistModel.getArtists(count, offset)
			.then(response => {
				formatServerRootForArray(response.body.artists, 'photo');
				return response;
			});
	}
}

export default Artists;
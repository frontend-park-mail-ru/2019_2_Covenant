import template from './Artists.pug';
import CardList from '../../../common/Content/CardList/CardList';
import ArtistModel from '../../../models/ArtistModel';
import {formatServerRootForArray} from '../../../services/Utils';
import Urls from '../../../services/Urls';
import Link from '../../../common/Kit/Link/Link';

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

	onRender() {
		super.onRender();

		this.state.items.forEach(artist => {
			const url = Urls.ArtistUrl.replace(/:\w+/, artist.id);
			new Link({elementId: `artist-list-name-${artist.id}`, eventType: 'click', route: url});
			new Link({elementId: `artist-list-img-${artist.id}`, eventType: 'click', route: url});
		});
	}
}

export default Artists;
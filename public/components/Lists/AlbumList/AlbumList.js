import CardList from '../../../common/Content/CardList/CardList';
import template from './AlbumList.pug';
import AlbumModel from '../../../models/AlbumModel';
import {formatServerRootForArray} from '../../../services/Utils';
import Urls from '../../../services/Urls';
import Link from '../../../common/Kit/Link/Link';

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

	onRender() {
		super.onRender();

		this.addAlbumHandlers();
		this.addArtistHandlers();
	}

	addAlbumHandlers() {
		this.state.items.forEach(album => {
			const url = Urls.AlbumURl.replace(/:\w+/, album.id);
			new Link({elementId: `album-list-img-${album.id}`, eventType: 'click', route: url});
			new Link({elementId: `album-list-title-${album.id}`, eventType: 'click', route: url});
		});
	}

	addArtistHandlers() {
		this.state.items.forEach(album => {
			const url = Urls.ArtistUrl.replace(/:\w+/, album.artist_id);
			new Link({elementId: `album-list-artist-${album.id}`, eventType: 'click', route: url});
		});
	}
}

export default AlbumList;
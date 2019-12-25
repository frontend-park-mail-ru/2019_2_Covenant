import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './AlbumScroll.pug';
import Urls from '../../../services/Urls';
import {formatServerRootForArray} from '../../../services/Utils';
import Link from '../../../common/Kit/Link/Link';

class AlbumScroll extends BaseComponent {
	constructor({albums = [], title = 'Albums'} ={}) {
		const initialState = {
			albums: [],
			title: title
		};
		super(template, initialState);

		this.state = initialState;
		this.state.albums = albums;
		formatServerRootForArray(this.state.albums,'photo');
		this.update(this.state);
	}

	onRender() {
		this.addAlbumHandlers();
		this.addArtistHandlers();
	}

	addAlbumHandlers() {
		this.state.albums.forEach(album => {
			const url = Urls.AlbumURl.replace(/:\w+/, album.id);
			new Link({elementId: `scroll-album-img-${album.id}`, eventType: 'click', route: url});
			new Link({elementId: `scroll-album-title-${album.id}`, eventType: 'click', route: url});
		});
	}

	addArtistHandlers() {
		this.state.albums.forEach(album => {
			const url = Urls.ArtistUrl.replace(/:\w+/, album.artist_id);
			new Link({elementId: `scroll-album-artist-title-${album.id}`, eventType: 'click', route: url});
		});
	}
}

export default AlbumScroll;
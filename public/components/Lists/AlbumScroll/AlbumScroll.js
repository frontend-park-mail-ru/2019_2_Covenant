import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './AlbumScroll.pug';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import Urls from '../../../services/Urls';
import {formatServerRootForArray} from '../../../services/Utils';

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
			const albumRef = document.getElementById(`scroll-album-title-${album.id}`);
			if (!albumRef) { return; }
			albumRef.addEventListener('click', () => {
				console.log(Urls.AlbumURl.replace(/:\w+/, album.id));
				EventBus.publish(Events.ChangeRoute, {newUrl: Urls.AlbumURl.replace(/:\w+/, album.id)});
			});
		});
	}

	addArtistHandlers() {
		this.state.albums.forEach(album => {
			const artistRef = document.getElementById(`scroll-album-artist-title-${album.artist_id}`);
			if (!artistRef) { return; }
			artistRef.addEventListener('click', () => {
				EventBus.publish(Events.ChangeRoute, {newUrl: `${Urls.ArtistsUrl}/${album.id}`});
			});
		});

	}
}

export default AlbumScroll;
import BaseComponent from '../../BaseComponent/BaseComponent';
import template from './AlbumScroll.pug';
import {SERVER_ROOT} from '../../../services/Settings';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import Urls from '../../../services/Urls';

class AlbumScroll extends BaseComponent {
	constructor({albums = [], title = 'Albums'} ={}) {
		const initialState = {
			albums: [],
			title: title
		};
		super(template, initialState);

		this.state = initialState;
		this.state.albums = albums;
		this.setServerRoot('albums');
		this.update(this.state);
	}

	setServerRoot(arrayName) {
		this.state[arrayName].forEach(item => {
			if (!item.photo.includes(SERVER_ROOT)) {
				item.photo = `${SERVER_ROOT}${item.photo}`;
			}
		});
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
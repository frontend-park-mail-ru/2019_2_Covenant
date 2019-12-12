import BaseComponent from '../../BaseComponent/BaseComponent';
import template from './Home.pug';
import AlbumModel from '../../../models/AlbumModel';
import {SERVER_ROOT} from '../../../services/Settings';

class Home extends BaseComponent {
	constructor() {
		const initialState = {
			albums: []
		};
		super(template, initialState);

		this.state = initialState;
		this.loadAlbums();
	}

	onRender() {

	}

	loadAlbums() {
		AlbumModel.getAlbums(15, 0)
		.then(response => {
			if (!response.error) {
				this.state.albums = response.body.albums;
				this.setServerRoot();
				this.update(this.state);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	setServerRoot() {
		this.state.albums.forEach(album => {
			if (!album.photo.includes(SERVER_ROOT)) {
				album.photo = `${SERVER_ROOT}${album.photo}`;
			}
		});
	}
}

export default Home;
import BaseComponent from '../../BaseComponent/BaseComponent';
import template from './Playlists.pug';
import PlaylistPopup from './PlaylistPopup/PlaylistPopup';
import PlaylistModel from '../../../models/PlaylistModel';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import {SERVER_ROOT} from '../../../services/Settings';

class Playlists extends BaseComponent {
	constructor() {
		const initialState = {
			title: 'Playlists',
			items: []
		};
		super(template, initialState);
		this.loadItems = this.loadItems.bind(this);
		this.setServerRoot = this.setServerRoot.bind(this);

		this.state = initialState;
		this.loadItems();

		EventBus.subscribe(Events.UpdatePlaylists, this.loadItems);
	}

	loadItems() {
		PlaylistModel.getPlaylists(20, 0)
		.then(response => {
			this.state.items = response.body.playlists;
			this.setServerRoot();
			this.update(this.state);
		})
		.catch(error => {
			console.log(error);
		});
	}

	onRender() {
		this.addHandlers();
	}

	addHandlers() {
		const createBtn = document.getElementById('create-playlist-btn');
		createBtn.addEventListener('click', this.createPlaylistHandler);
	}

	createPlaylistHandler() {
		const popup = new PlaylistPopup();
		popup.render('popup');
	}

	// temporary fix TODO: need NGINX
	setServerRoot() {
		this.state.items.forEach(item => {
			if (!item.photo.includes(SERVER_ROOT)) {
				item.photo = `${SERVER_ROOT}${item.photo}`;
			}
		});
	}
}

export default Playlists;
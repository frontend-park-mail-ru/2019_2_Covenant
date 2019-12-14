import BaseComponent from '../../BaseComponent/BaseComponent';
import template from './Playlists.pug';
import PlaylistPopup from './PlaylistPopup/PlaylistPopup';
import PlaylistModel from '../../../models/PlaylistModel';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import {SERVER_ROOT} from '../../../services/Settings';
import ConfirmationDialog from '../../../common/ConfirmationDialog/ConfirmationDialog';

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
		// TODO additional dots with dropdown: remove and share playlist
	}

	addHandlers() {
		const createBtn = document.getElementById('create-playlist-btn');
		createBtn.addEventListener('click', this.createPlaylistHandler);

		this.addDeleteHandlers();
	}

	createPlaylistHandler() {
		const popup = new PlaylistPopup();
		popup.render('popup');
	}

	addDeleteHandlers() {
		this.state.items.forEach(item => {
			const deleteBtn = document.getElementById(`delete-playlist-btn-${item.id}`);
			if (deleteBtn) {
				deleteBtn.addEventListener('click', () => { this.deletePlaylistHandler(item.id)});
			}
		});
	}

	deletePlaylist(id) {
		PlaylistModel.deletePlaylist(id)
		.then(response => {
			if (!response.error) {
				this.loadItems();
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	deletePlaylistHandler(id) {
		const dialog = new ConfirmationDialog({
			successCallback: () => {
				this.deletePlaylist(id);
			}
		});
		dialog.render('popup');
	}

	setServerRoot() {
		this.state.items.forEach(item => {
			if (!item.photo.includes(SERVER_ROOT)) {
				item.photo = `${SERVER_ROOT}${item.photo}`;
			}
		});
	}
}

export default Playlists;
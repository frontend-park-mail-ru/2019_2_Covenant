import BaseComponent from '../../../BaseComponent/BaseComponent';
import template from './SelectPlaylistPopup.pug';
import PlaylistModel from '../../../../models/PlaylistModel';
import {formatServerRootForArray} from '../../../../services/Utils';

class SelectPlaylistPopup extends BaseComponent {
	constructor({trackId = ''} = {}) {
		const initialState = {
			items: [],
			trackId: trackId
		};
		super(template, initialState);
		this.state = initialState;
		this.loadPlaylists();

		this.closeHandler = this.closeHandler.bind(this);
		this.addToPlaylist = this.addToPlaylist.bind(this);
	}

	loadPlaylists() {
		PlaylistModel.getPlaylists(10, 0)
		.then(response => {
			this.state.items = response.body.playlists;
			formatServerRootForArray(this.state.items, 'photo');
			this.update(this.state);
		})
		.catch(error => {
			console.log(error);
		});
	}

	onRender() {
		const closeBtn = document.getElementById('popup-close-btn');
		closeBtn.addEventListener('click', this.closeHandler);

		const cancelBtn = document.getElementById('popup-cancel-btn');
		cancelBtn.addEventListener('click', this.closeHandler);

		this.state.items.forEach(item => {
			const addBtn = document.getElementById(`popup-select-btn-${item.id}`);
			addBtn.addEventListener('click', () => {this.addToPlaylist(item.id);} );
		});
	}

	closeHandler() {
		this.hide();
	}

	addToPlaylist(playlistId) {
		PlaylistModel.addToPlaylist({
			trackId: this.state.trackId,
			playlistId: playlistId
		})
		.then(() => {
			this.closeHandler();
		})
		.catch(error => {
			console.log(error);
		});
	}
}

export default SelectPlaylistPopup;
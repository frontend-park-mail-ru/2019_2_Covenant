import BaseComponent from '../../../BaseComponent/BaseComponent';
import template from './Track.pug';
import TrackModel from '../../../../models/TrackModel';
import SelectPlaylistPopup from '../../../Content/Playlists/SelectPlaylistPopup/SelectPlaylistPopup';

class Track extends BaseComponent {
	constructor({index = -1, track = null} = {}) {
		const initialState = {
			index: index,
			track: track,
			user: null
		};
		super(template, initialState);
		this.state = initialState;

		this.addToFavouriteHandler = this.addToFavouriteHandler.bind(this);
		this.removeFromFavouriteHandler = this.removeFromFavouriteHandler.bind(this);
		this.playlistHandler = this.playlistHandler.bind(this);
	}

	onRender() {
		const addToFavourite = document.getElementById(`like-btn-${this.state.track.id}`);
		if (addToFavourite) {
			addToFavourite.addEventListener('click', this.addToFavouriteHandler);
		}

		const removeFromFavourite = document.getElementById(`remove-btn-${this.state.track.id}`);
		if (removeFromFavourite) {
			removeFromFavourite.addEventListener('click', this.removeFromFavouriteHandler);
		}

		const playlistBtn = document.getElementById(`add-to-playlist-${this.state.track.id}`);
		if (playlistBtn) {
			playlistBtn.addEventListener('click', this.playlistHandler);
		}
	}

	onDestroy() {

	}

	addToFavouriteHandler() {
		TrackModel.addToFavourites(this.state.track.id)
			.then(response => {
				if (response.error ) {
					console.log(response.error);
					return;
				}
				this.state.track.is_favourite = true;
				this.update(this.state);
			})
			.catch(error => {
				console.log(error);
			});
	}

	removeFromFavouriteHandler() {
		TrackModel.removeFromFavourites(this.state.track.id)
			.then(response => {
				if (response.error ) {
					console.log(response.error);
					return;
				}
				this.state.track.is_favourite = null;
				this.update(this.state);
			})
			.catch(error => {
				console.log(error);
			});
	}

	playlistHandler() {
		const popup = new SelectPlaylistPopup({trackId: this.state.track.id});
		popup.render('popup');
	}
}

export default Track;
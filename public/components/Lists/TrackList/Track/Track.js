import BaseComponent from '../../../../common/BaseComponent/BaseComponent';
import template from './Track.pug';
import TrackModel from '../../../../models/TrackModel';
import SelectPlaylistPopup from '../../../Content/Playlists/SelectPlaylistPopup/SelectPlaylistPopup';
import LikeModel from '../../../../models/LikeModel';

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
		this.addToRatingHandler = this.addToRatingHandler.bind(this);
		this.removeFromRatingHandler = this.removeFromRatingHandler.bind(this);
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

		const addToRating = document.getElementById(`rating-up-btn-${this.state.track.id}`);
		if (addToRating) {
			addToRating.addEventListener('click', this.addToRatingHandler);
		}

		const removeFromRating = document.getElementById(`rating-down-${this.state.track.id}`);
		if (removeFromRating) {
			removeFromRating.addEventListener('click', this.removeFromRatingHandler);
		}

		const playlistBtn = document.getElementById(`add-to-playlist-${this.state.track.id}`);
		if (playlistBtn) {
			playlistBtn.addEventListener('click', this.playlistHandler);
		}
	}

	onDestroy() {

	}

	addToRatingHandler() {
		LikeModel.like(this.state.track.id)
			.then(response => {
				if (response.error ) {
					console.log(response.error);
					return;
				}
				this.state.track.is_liked = true;
				this.update(this.state);
			})
			.catch(error => {
				console.log(error);
			});
	}

	removeFromRatingHandler() {
		LikeModel.dislike(this.state.track.id)
		.then(response => {
			if (response.error ) {
				console.log(response.error);
				return;
			}
			this.state.track.is_liked = false;
			this.update(this.state);
		})
		.catch(error => {
			console.log(error);
		});
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
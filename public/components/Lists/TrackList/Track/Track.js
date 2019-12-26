import BaseComponent from '../../../../common/BaseComponent/BaseComponent';
import template from './Track.pug';
import TrackModel from '../../../../models/TrackModel';
import SelectPlaylistPopup from '../../../Content/Playlists/SelectPlaylistPopup/SelectPlaylistPopup';
import LikeModel from '../../../../models/LikeModel';
import Button from '../../../../common/Kit/Button/Button';
import Urls from '../../../../services/Urls';
import Link from '../../../../common/Kit/Link/Link';

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
		new Button({id: `like-btn-${this.state.track.id}`, callback: this.addToFavouriteHandler});
		new Button({id: `remove-btn-${this.state.track.id}`, callback: this.removeFromFavouriteHandler});
		new Button({id: `rating-up-btn-${this.state.track.id}`, callback: this.addToRatingHandler});
		new Button({id: `rating-down-${this.state.track.id}`, callback: this.removeFromRatingHandler});
		new Button({id: `add-to-playlist-${this.state.track.id}`, callback: this.playlistHandler});

		const url = Urls.ArtistUrl.replace(/:\w+/, this.state.track.artist_id);
		new Link({elementId: `track-artist-${this.state.track.id}`, eventType: 'click', route: url});
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
				this.state.track.is_favourite = false;
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
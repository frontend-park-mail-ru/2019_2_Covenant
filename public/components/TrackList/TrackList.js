import BaseComponent from "../BaseComponent/BaseComponent";
import template from '../TrackList/TrackList.pug';
import TrackModel from "../../models/TrackModel";
import Player from "../Player/Player";

class TrackList extends BaseComponent{
	constructor() {
		const state = {
			tracks: [],
			favs: null
		};
		super(template, state);

		this.state = state;
		this.checkFavourite = this.checkFavourite.bind(this);
		this.addToFavourites = this.addToFavourites.bind(this);
		this.removeFromFavourites = this.removeFromFavourites.bind(this);
		this.playTrack = this.playTrack.bind(this);
		this.pauseTrack = this.pauseTrack.bind(this);

		this.loadTracks();
		this.loadFavourites();
	}

	loadTracks() {
		TrackModel.popular()
		.then(response => {
			if (!response.error) {
				const tracks = response.body;
				this.convertDuration(tracks);
				this.state.tracks = tracks;
				this.updateState();
			} else {
				console.log(response.error);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	loadFavourites() {
		TrackModel.favourites()
		.then(response => {
			if (!response.error) {
				this.state.favs = response.body;
				this.state.checkFavourite = this.checkFavourite;
				this.updateState();
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	checkFavourite(track) {
		const favs = this.state.favs;
		const favItem = favs.find(fav => {
			return fav.id === track.id;
		});
		return favItem != null;
	}

	addToFavourites(favouriteTrack) {
		TrackModel.addToFavourites(favouriteTrack.id)
		.then(response => {
			if (!response.error) {
				this.state.favs.push(favouriteTrack);
				this.updateState();
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	removeFromFavourites(favouriteTrack) {
		TrackModel.removeFromFavourites(favouriteTrack.id)
		.then(response => {
			if (!response.error) {
				const fav = this.state.favs.find(item =>  {
					return item.id === favouriteTrack.id;
				});
				const favIndex = this.state.favs.indexOf(fav);
				this.state.favs.splice(favIndex, 1);

				this.updateState();
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	convertDuration(tracks) {
		tracks.map(track => {
			const durationStr = track.duration;
			const arr = durationStr.split(':');
			track.duration = `${arr[1]}:${arr[2]}`;
			return track;
		})
	}

	playTrack(track) {
		const index = this.state.tracks.indexOf(track);
		this.state.tracks[index].isPlaying = true;
		this.updateState();

		Player.play(track.path);
	}

	pauseTrack(track) {
		const index = this.state.tracks.indexOf(track);
		this.state.tracks[index].isPlaying = false;
		this.updateState();

		Player.pause(track.path);
	}

	updateState() {
		this.update(this.state);

		this.setHandlersForTracks({ className: 'like', handler: this.addToFavourites });
		this.setHandlersForTracks({ className: 'dislike', handler: this.removeFromFavourites });
		this.setHandlersForTracks({ className: 'avatar_img', handler: this.playTrack });
		this.setHandlersForTracks({ className: 'pause_img', handler: this.pauseTrack });
	}

	setHandlersForTracks({className = '', handler = () => {}}) {
		const btns = document.getElementsByName(className);
		btns.forEach(btn => {
			const id = +btn.id;
			btn.addEventListener('click', () => {
				const track = this.state.tracks.find(item =>  { return item.id === id; } );
				if (track) {
					handler(track);
				}
			});
		});
	}
}

export default TrackList;

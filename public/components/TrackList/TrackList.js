import BaseComponent from "../BaseComponent/BaseComponent";
import template from '../TrackList/TrackList.pug';
import TrackModel from "../../models/TrackModel";

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

	convertDuration(tracks) {
		tracks.map(track => {
			const durationStr = track.duration;
			const arr = durationStr.split(':');
			track.duration = `${arr[1]}:${arr[2]}`;
			return track;
		})
	}

	updateState() {
		this.update(this.state);
		this.addHandlers();
	}

	addHandlers() {
		const likesBtn = document.getElementsByName('like');
		likesBtn.forEach(likeBtn => {
			const id = +likeBtn.id;
			likeBtn.addEventListener('click', () => {
				const track = this.state.tracks.find(item =>  { return item.id === id; } );
				if (track) {
					this.addToFavourites(track);
				}
			});
		});
	}
}

export default TrackList;

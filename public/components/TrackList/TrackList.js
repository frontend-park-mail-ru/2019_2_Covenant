import BaseComponent from "../BaseComponent/BaseComponent";
import template from '../TrackList/TrackList.pug';
import TrackModel from "../../models/TrackModel";

class TrackList extends BaseComponent{
	constructor() {
		const state = {
			tracks: []
		};
		super(template, state);

		this.state = state;
		this.updateTracks = this.updateTracks.bind(this);

		this.loadTracks();
	}

	loadTracks() {
		TrackModel.popular()
		.then(response => {
			if (!response.error) {
				const tracks = response.body;
				this.convertDuration(tracks);
				this.updateTracks(tracks);
			} else {
				console.log(response.error);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	convertDuration(tracks) {
		tracks = tracks.map(track => {
			const durationStr = track.duration;
			const arr = durationStr.split(':');
			track.duration = `${arr[1]}:${arr[2]}`;
			return track;
		})
	}

	updateTracks(tracks) {
		this.state.tracks = tracks;
		this.update(this.state);
	}
}

export default TrackList;

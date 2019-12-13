import BaseComponent from '../../BaseComponent/BaseComponent';
import template from './TrackList.pug';
import {SERVER_ROOT} from '../../../services/Settings';

class TrackList extends BaseComponent {
	constructor({tracks = []}) {
		const initialState = {
			tracks: []
		};
		super(template, initialState);

		this.state = initialState;
		this.state.tracks = tracks;

		this.setServerRoot('tracks');
		this.formatDuration();
		this.update(this.state);
	}

	setServerRoot(arrayName) {
		this.state[arrayName].forEach(item => {
			if (!item.photo.includes(SERVER_ROOT)) {
				item.photo = `${SERVER_ROOT}${item.photo}`;
			}
		});
	}

	formatDuration() {
		this.state.tracks.forEach(track => {
			const time = track.duration.split(':');
			track.duration = `${time[1]}:${time[2]}`;
		});
	}

}

export default TrackList;
import BaseComponent from '../../BaseComponent/BaseComponent';
import template from './TrackList.pug';
import {formatDurationForArray, formatServerRootForArray} from '../../../services/Utils';

class TrackList extends BaseComponent {
	constructor({tracks = [],
		trackClassName = 'track-list col-2',
		withTitle= true,
		withIndexes = false} = {}) {
		const initialState = {
			withTitle: withTitle,
			withIndexes: withIndexes,
			tracksClassName: trackClassName,
			tracks: []
		};
		super(template, initialState);

		this.state = initialState;
		this.state.tracks = tracks;

		formatServerRootForArray(this.state.tracks);
		formatDurationForArray(this.state.tracks);
		this.update(this.state);
	}

	onRender() {
		this.state.tracks.forEach(track => {
			const avatar = document.getElementById(`track-avatar-play-${track.id}`);
			if (avatar) {
				avatar.addEventListener('click', () => {
					console.log('track avatar click');
				});
			}
		});
	}
}

export default TrackList;
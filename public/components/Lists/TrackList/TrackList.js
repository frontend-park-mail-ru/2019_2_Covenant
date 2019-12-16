import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './TrackList.pug';
import {formatDurationForArray, formatServerRootForArray} from '../../../services/Utils';
import Track from './Track/Track';
import {AudioPlayer} from 'audioplayer/player/AudioPlayer';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';

class TrackList extends BaseComponent {
	constructor({tracks = [],
		trackClassName = 'track-list col-2',
		withTitle= true,
		withIndexes = false} = {}) {
		const initialState = {
			withTitle: withTitle,
			withIndexes: withIndexes,
			tracksClassName: trackClassName,
			tracks: [],
			trackNodes: [],
			position: 0
		};
		super(template, initialState);
		this.trackControl = this.trackControl.bind(this);
		this.setPosition = this.setPosition.bind(this);

		this.state = initialState;
		this.state.tracks = tracks;

		formatServerRootForArray(this.state.tracks, 'photo');
		formatServerRootForArray(this.state.tracks, 'path');
		formatDurationForArray(this.state.tracks);
		this.update(this.state);

		EventBus.subscribe(Events.TrackChange, this.setPosition);
	}

	onRender() {
		this.renderTracks();
		this.addControlHandlers();
	}

	renderTracks() {
		this.state.trackNodes = [];
		this.state.tracks.forEach((track, index) => {
			const trackInit = {
				index: this.state.withIndexes ? index : -1,
				track: track
			};
			const trackNode = new Track(trackInit);
			trackNode.render(`track-item-${track.id}`);
			this.state.trackNodes.push(trackNode);
		});
	}

	addControlHandlers() {
		this.state.tracks.forEach((track, index) => {
			const avatar = document.getElementById(`track-avatar-control-${track.id}`);
			if (avatar) {
				avatar.addEventListener('click', () => { this.trackControl(track, index); });
			}
		});
	}

	trackControl(track, index) {
		EventBus.publish(Events.UpdateTracksQueue, {tracks: this.state.tracks});
		const player = AudioPlayer.getInstance();
		player.switchOver(index  - this.state.position);
		player.play();
	}

	setPosition(track) {
		this.state.position = this.state.tracks.indexOf(track);
	}

	onDestroy() {
		this.state.trackNodes.forEach(trackNode => {
			trackNode.onDestroy();
		});
		EventBus.unSubscribe(Events.TrackChange, this.setPosition);
	}
}

export default TrackList;
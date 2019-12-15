import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Player.pug';
import {AudioPlayer} from '../../../audio-system/audioplayer';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import {formatServerRootForArray} from '../../services/Utils';

class Player extends BaseComponent {
	constructor() {
		const initialState = {
			item: null,
			duration: 0
		};
		super(template, initialState);

		this.prevHandler = this.prevHandler.bind(this);
		this.controlHandler = this.controlHandler.bind(this);
		this.nextHandler = this.nextHandler.bind(this);

		this.setTracksToQueue = this.setTracksToQueue.bind(this);
		this.onTrackChanged = this.onTrackChanged.bind(this);

		this.state = initialState;
		this.tracks = [];
		this.audioPlayer = AudioPlayer.getInstance();
		this.audioPlayer.onTrackChanged = this.onTrackChanged;

		EventBus.subscribe(Events.UpdateTracksQueue, this.setTracksToQueue);
	}

	static getInstance() {
		if (!Player.instance) {
			Player.instance = new Player();
		}
		return Player.instance;
	}

	onRender() {
		this.addHandlers();
	}

	addHandlers() {
		const prevBtn = document.getElementById('player-prev-btn');
		prevBtn.addEventListener('click', this.prevHandler);

		const playBtn = document.getElementById('player-control-btn');
		playBtn.addEventListener('click', this.controlHandler);

		const nextBtn = document.getElementById('player-next-btn');
		nextBtn.addEventListener('click', this.nextHandler);
	}

	prevHandler() {
		this.audioPlayer.switchPrev();
	}

	nextHandler() {
		this.audioPlayer.switchNext();
	}

	controlHandler() {
		const btn = document.getElementById('player-control-btn');

		if (this.audioPlayer.isPlaying) {
			this.audioPlayer.pause();
			btn.src = '/static/img/triangle.png';
			return;
		}

		this.audioPlayer.play();
		btn.src = '/static/img/pause.png';
	}

	setTracksToQueue(object) {
		const equals = this.isEqualQueues(object.tracks);
		if (equals) {
			return;
		}

		this.tracks = object.tracks;
		formatServerRootForArray(object.tracks, 'photo');
		formatServerRootForArray(object.tracks, 'path');
		object.tracks.forEach(track => {
			track.url = track.path;
		});
		this.audioPlayer.setPlaylist(object.tracks);

		this.state.item = this.audioPlayer.currentPlayback;
	}

	onTrackChanged() {
		this.state.item = this.audioPlayer.currentPlayback;
		EventBus.publish(Events.TrackChange, this.state.item);
		this.update(this.state);

		if (!this.audioPlayer.isPlaying) {
			this.audioPlayer.play();
		}

		const btn = document.getElementById('player-control-btn');
		btn.src = '/static/img/pause.png';
	}

	isEqualQueues(queue) {
		if (this.tracks.length === 0) {
			return false;
		}

		if (queue.length !== this.tracks.length) {
			return false;
		}

		let result = true;
		for (let i = 0; i < this.tracks.length; i++) {
			if (this.tracks[i].id !== queue[i].id) {
				result = false;
				break;
			}
		}
		return result;
	}
}

export default Player;

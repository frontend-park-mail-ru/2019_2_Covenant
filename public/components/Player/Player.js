import BaseComponent from '../../common/BaseComponent/BaseComponent';
import template from './Player.pug';
import {AudioPlayer} from '../../../audio-system/audioplayer';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import {formatServerRootForArray} from '../../services/Utils';
import Button from '../../common/Kit/Button/Button';
import Urls from '../../services/Urls';
import Link from '../../common/Kit/Link/Link';

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
		this.onTimeUpdate = this.onTimeUpdate.bind(this);
		this.setDurationHandler = this.setDurationHandler.bind(this);

		this.state = initialState;
		this.tracks = [];
		this.audioPlayer = AudioPlayer.getInstance();
		this.audioPlayer.onTrackChanged = this.onTrackChanged;
		this.audioPlayer.onTimeUpdate = this.onTimeUpdate;

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
		new Button({id: 'player-prev-btn', callback: this.prevHandler});
		new Button({id: 'player-control-btn', callback: this.controlHandler});
		new Button({id: 'player-next-btn', callback: this.nextHandler});
		new Button({id: 'secondary-progress-id', callback: this.setDurationHandler});

		if (this.state.item) {
			const artistId = this.state.item.artist_id;
			const albumId =  this.state.item.album_id;

			if (artistId) {
				const artistUrl =  Urls.ArtistUrl.replace(/:\w+/, artistId);
				new Link({elementId: 'player-artist-name-id', eventType: 'click', route: artistUrl});
			}

			if (albumId) {
				const albumUrl = Urls.AlbumURl.replace(/:\w+/, albumId);
				new Link({elementId: 'playlist-album-img-id', eventType: 'click', route: albumUrl});
			}
		}
	}

	prevHandler() {
		this.audioPlayer.switchPrev();
	}

	nextHandler() {
		this.audioPlayer.switchNext();
	}

	controlHandler() {
		const btn = document.getElementById('player-control-btn');

		if (!this.audioPlayer.currentPlayback) {
			return;
		}

		if (this.audioPlayer.isPlaying) {
			this.audioPlayer.pause();
			btn.src = '/static/img/triangle.png';
			return;
		}

		this.audioPlayer.play();
		btn.src = '/static/img/pause.png';
	}

	setDurationHandler(e) {
		const parent = document.getElementById('secondary-progress-id');
		const width = parent.offsetWidth;
		const diff = e.x - parent.offsetLeft;
		const percent = (diff * 100 / width).toFixed(2);
		const normalizedPosition =  (diff / width).toFixed(2);

		if (!this.audioPlayer.currentPlayback) {
			return;
		}

		const progress = document.getElementById('primary-progress-id');
		progress.style.width = `${percent}%`;

		this.audioPlayer.seekToNormalized(+normalizedPosition);
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

	onTimeUpdate() {
		const normPosition = this.audioPlayer.normalizedPosition;

		const progress = document.getElementById('primary-progress-id');
		progress.style.width = `${normPosition * 100}%`;
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

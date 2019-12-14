import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Player.pug';
import {AudioPlayer, Looping} from '../../../audio-system/audioplayer';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import {formatServerRootForArray} from '../../services/Utils';

class Player extends BaseComponent {
	constructor() {
		const initialState = {
			item: null,
			duration: 0,
			isPlaying: false
		};
		super(template, initialState);

		this.state = initialState;
		this.audioPlayer = AudioPlayer.getInstance();
		this.state.item = this.audioPlayer.currentPlayback;
		this.update(this.state);

		this.setTracksToQueue = this.setTracksToQueue.bind(this);
		EventBus.subscribe(Events.UpdateTracksQueue, this.setTracksToQueue);

		this.shuffleHandler = this.shuffleHandler.bind(this);
		this.prevHandler = this.prevHandler.bind(this);
		this.playHandler = this.playHandler.bind(this);
		this.nextHandler = this.nextHandler.bind(this);
		this.repeatHandler = this.repeatHandler.bind(this);
	}

	onRender() {
		this.addHandlers();
	}

	addHandlers() {
		const shuffleBtn = document.getElementById('player-shuffle-btn');
		shuffleBtn.addEventListener('click', this.shuffleHandler);

		const prevBtn = document.getElementById('player-prev-btn');
		prevBtn.addEventListener('click', this.prevHandler);

		const playBtn = document.getElementById('player-play-btn');
		playBtn.addEventListener('click', this.playHandler);

		const nextBtn = document.getElementById('player-next-btn');
		nextBtn.addEventListener('click', this.nextHandler);

		const repeatBtn = document.getElementById('player-repeat-btn');
		repeatBtn.addEventListener('click', this.repeatHandler);
	}

	shuffleHandler() {
		console.log('shuffle');
		this.audioPlayer.shuffle = true;
		this.updateCurrent();
	}

	prevHandler() {
		console.log('prev');
		this.audioPlayer.switchPrev();
		this.updateCurrent();
	}

	nextHandler() {
		console.log('next');
		this.audioPlayer.switchNext();
		this.updateCurrent();
	}

	playHandler() {
		console.log('play');
		this.audioPlayer.play();
	}

	repeatHandler() {
		console.log('repeat');
		this.audioPlayer.looping = Looping.queue;
		this.updateCurrent();
	}

	setTracksToQueue(object) {
		formatServerRootForArray(object.tracks, 'photo');
		formatServerRootForArray(object.tracks, 'path');
		object.tracks.forEach(track => {
			track.url = track.path;
		});
		this.audioPlayer.setPlaylist(object.tracks);

		this.state.item = this.audioPlayer.currentPlayback;
		this.update(this.state);
	}

	setPauseButton() {

	}

	updateCurrent() {
		this.state.item = this.audioPlayer.currentPlayback;
		this.update(this.state);
	}
}

export default Player;

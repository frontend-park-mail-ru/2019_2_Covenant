import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Player.pug';
import {AudioPlayer, Looping} from '../../../audio-system/audioplayer';

class Player extends BaseComponent {
	constructor() {
		super(template);

		const audioPlayer = new AudioPlayer(Looping.none);
		debugger;
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
	}

	prevHandler() {
		console.log('prev');
	}

	nextHandler() {
		console.log('next');
	}

	playHandler() {
		console.log('play');
	}

	repeatHandler() {
		console.log('repeat');
	}
}

export default Player;

import BaseComponent from '../../../BaseComponent/BaseComponent';
import template from './Track.pug';

class Track extends BaseComponent {
	constructor({index = -1, track = null} = {}) {
		const initialState = {
			index: index,
			track: track,
			isPlaying: false
		};
		super(template, initialState);
		this.state = initialState;
	}

	onRender() {

	}

	onDestroy() {

	}

}

export default Track;
import { SERVER_ROOT } from "../../services/Settings";

class Player {
	constructor() {
		if (Player.instance)
			return Player.instance;

		this.url = '';
		this.audioTrack = null;
		Player.instance = this;
		return this;
	}

	play(url) {
		this.audioTrack = new Audio(`${SERVER_ROOT}${url}`);
		this.audioTrack.play();
	}

	pause() {
		if (this.audioTrack) {}
		this.audioTrack.pause();
	}
}

export default new Player();

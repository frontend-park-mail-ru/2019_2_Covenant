import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Avatar.pug';
import EventBusModule from '../../services/EventBus';
import Events from '../../services/Events';
import { SERVER_ROOT } from "../../services/Settings";

const EventBus = new EventBusModule();

class Avatar extends BaseComponent {
	constructor({width = 100, height = 100, src = 'img/user_profile.png', alt = 'avatar', onUpload = {}, accept='.png' } = {}) {
		const state = {data: {width: width, height: height, src: src, alt: alt, accept: accept} };
		super(template, state);
		this.state = state;

		this.onUpload = onUpload;

		this.updateAvatar = this.updateAvatar.bind(this);
		EventBus.subscribe(Events.UpdateUser, this.updateAvatar);
	}

	onRender() {
		const input = document.getElementById('avatar_upload_input');
		if(input) {
			input.addEventListener('change', () => { this.onUpload(input.files[0]); });
		}
	}

	updateAvatar(data) {
		if (!data.avatar.includes(SERVER_ROOT)) {
			this.state.data.src = `${SERVER_ROOT}${data.avatar}`;
		} else {
			this.state.data.src = data.avatar;
		}

		this.update(this.state);
	}
}

export default Avatar;


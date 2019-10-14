import template from './Profile.pug';

import EventBus from '../../services/EventBus.js';
import ApiModule from '../../services/API.js';

const API = new ApiModule();

export default class Profile {

	constructor() {
		const info = 'Lorem ipsum dolor sit amet, ' +
			'consectetur adipisicing elit, sed do eiusmod tempor incididunt ' +
			'ut labore et dolore magna aliqua.';

		const tabs = [
			{ name: 'Tracks', text: info },
			{ name: 'History', text: info },
			{ name: 'Albums', text: info },
			{ name: 'Artists', text: info },
			{ name: 'Playlists', text: info },
			{ name: 'Friends', text: info }
		];

		this.data = {
			edit: false,
			tabs: tabs
		};
	}

	onEdit() {
		this.data.edit = true;
		EventBus.publish('renderProfile', {});
	}

	onSave() {
		this.data.edit = false;

		const name = document.getElementById('profile__name__input').value;
		if(!name || name === '')
			return;

		API.profileSaveReq(name).then(response => {
			console.log(response);
			EventBus.publish('renderProfile', {});
		}).catch(error => {
			console.log(error);
		});
	}

	onUploadAvatar() {
		const imageInput = document.getElementById('avatar_upload_input');
		const file = imageInput.files[0];

		API.uploadAvatarReq(file).then(response => {
			console.log(response);
			EventBus.publish('renderProfile', {});
		}).catch(error => {
			console.log(error);
		});
	}

	afterRender() {
		const editInfo = document.getElementById('edit_pencil');
		if (editInfo) {
			editInfo.addEventListener('click', (evt) => this.onEdit(evt));
		}

		const saveInfo = document.getElementById('save_info');
		if(saveInfo) {
			saveInfo.addEventListener('click', (evt) => this.onSave(evt));
		}

		const avatarUpload = document.getElementById('avatar_upload_input');
		if(avatarUpload) {
			avatarUpload.addEventListener('change', (evt) => this.onUploadAvatar(evt));
		}
	}

	render(user) {
		return template({
			page: this.data,
			user: user
		});
	}
}

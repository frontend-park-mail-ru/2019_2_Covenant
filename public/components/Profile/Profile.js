'use strict';

import EventBus from '../../services/PublisherSubscriber.js';
import ApiModule from '../../services/API.js';

const API = new ApiModule();

export default class Profile {

	constructor() {
		this.edit = false;
	}

	onEdit() {
		this.edit = true;
		EventBus.publish('renderProfile', {});
	}

	onSave() {
		this.edit = false;

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

	renderInfo() {
		if(!this.edit) {
			return `
			<div class="info__user">
	            <label class="info__user__name">{{username}}</label>
	            <div class="info__user__edit">
	                <img id="edit_pencil" class="info__user__edit__img" src="img/edit.png" width="32" height="32" alt="edit" />
	            </div>
	        </div>
			`;
		}

		return `
			<div class="info__user">
	            <input value={{username}} id="profile__name__input" type="text">
	            <div class="info__user__save">
	                <img id="save_info" class="info__user__edit__img" src="img/save.png" width="32" height="32" alt="save" />
	            </div>
	        </div>
		`;
	}

	renderAvatar() {
		return `
			<div class="avatar">
				<input type="file" id="avatar_upload_input" name="image" accept=".jpg, .jpeg, .png" style="display:block; max-width: 200px"/>	
				{{#avatar}}			
					<img width="120" height="120" src={{avatar}} alt="user_profile" id="avatar_upload" style="display: block; cursor:pointer"/>
				{{/avatar}}
				{{^avatar}}
					<img width="120" height="120" src={{originalAvatar}} alt="user_profile" id="avatar_upload" style="display: block; cursor:pointer"/>
				{{/avatar}}
			</div>
		`;
	}

	render() {
		return `
	    <div class="header">
	        <ul class="header__list">
	            <li class="header__list_home">
	                <a href="" id="main_link" class="header__list_home__link">Covenant</a>
	            </li>
	            <li class="header__list_logout">
	                <a href="" id="logout_link" class="header__list_logout__link">
	                    <img src="img/logout.png" width="34" height="34" alt="logout"/>
	                </a>
	            </li>
	            <li class="header__list_avatar">
	                <a href="" id="profile" class="header__list_avatar__link">
	                    {{#avatar}}
	                        <img src={{avatar}} width="34" height="34" alt="user"/>\
	                    {{/avatar}}
	                    {{^avatar}}
	                        <img src="img/user.png" width="34" height="34" alt="user"/>\
	                    {{/avatar}}
	                </a>
	            </li>
	            <li class="header__list_name">
	                <a href="" id="profile" class="header__list_name__link">{{username}}</a>
	            </li>
	        </ul>
	    </div>
	    <div class="container">
	        <div class="container__profile">
	            <div class="profile">
	                ` + this.renderAvatar() +
					'<div class="info">'
					+ this.renderInfo() +
					`<div class="info__buttons">
	                        <div class="info__buttons__shuffle">
	                            <button class="btn__shuffle" type="button">
	                                <img  class="btn__shuffle__img" src="img/play_dark.png" width="32" height="32" alt="play"/>
	                                <label class="btn__shuffle__label">Shuffle</label>
	                            </button>
	                        </div>
	                        <div class="info__buttons__settings">
	                            <button class="btn__settings" type="button">
	                                <img class="btn__shuffle__settings" src="img/settings_dark.png" width="32" height="32" alt="settings"/>
	                            </button>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="music">
	                <ul class="tabs">
	                    <li>
	                        <input type="radio" name="tabs" id="tab-1" checked>
	                        <label class="tab__label" for="tab-1">Tracks</label>
	                        <div class="tab-content">
	                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	                            tempor incididunt ut labore et dolore magna aliqua.
	                        </div>
	                    </li>
	                    <li>
	                        <input type="radio" name="tabs" id="tab-2">
	                        <label class="tab__label" for="tab-2">History</label>
	                        <div class="tab-content">
	                            Ut enim ad minim veniam,
	                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                            consequat.
	                        </div>
	                    </li>
	                    <li>
	                        <input type="radio" name="tabs" id="tab-3">
	                        <label class="tab__label" for="tab-3">Albums</label>
	                        <div class="tab-content">
	                            Ut enim ad minim veniam,
	                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                            consequat.
	                        </div>
	                    </li>
	                    <li>
	                        <input type="radio" name="tabs" id="tab-4">
	                        <label class="tab__label" for="tab-4">Artists</label>
	                        <div class="tab-content">
	                            Ut enim ad minim veniam,
	                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                            consequat.
	                        </div>
	                    </li>
	                    <li>
	                        <input type="radio" name="tabs" id="tab-5">
	                        <label class="tab__label" for="tab-5">Playlists</label>
	                        <div class="tab-content">
	                            Ut enim ad minim veniam,
	                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                            consequat.
	                        </div>
	                    </li>
	                    <li>
	                        <input type="radio" name="tabs" id="tab-6">
	                        <label class="tab__label" for="tab-6">Friends</label>
	                        <div class="tab-content">
	                            Ut enim ad minim veniam,
	                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                            consequat.
	                        </div>
	                    </li>
	                </ul>
	            </div>
	        </div>
	    </div>
	    <div class="footer">
	    </div>
	`;
	}
}
import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Profile.pug';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import SessionModel from '../../models/SessionModel';
import Urls from '../../services/Urls';
import UserModel from '../../models/UserModel';
import {formatServerRoot} from '../../services/Utils';
import File from '../../common/Kit/File/File';

class Profile extends BaseComponent {
	constructor({anotherProfile = false, eventName = ''} = {}) {
		const initialState = {
			anotherProfile: anotherProfile,
			eventName: eventName,
			user: null
		};
		super(template, initialState);
		this.state = initialState;

		this.updateUser = this.updateUser.bind(this);
		this.onUploadAvatar = this.onUploadAvatar.bind(this);
		EventBus.subscribe(eventName, this.updateUser);
	}

	onRender() {
		const photo = this.state.user ? this.state.user.avatar : null;
		this.photoInput = new File({
			src: photo,
			accept: '.jpeg, .jpg, .png',
			disabled: this.state.anotherProfile ? 'disabled' : null
		});
		this.photoInput.render('avatar');

		this.addLogoutHandler();
	}

	updateUser(data) {
		formatServerRoot(data, 'avatar');
		this.state.user = data;
		this.update(this.state);
	}

	onUploadAvatar(file) {
		UserModel.uploadAvatar(file)
			.then(response => {
				EventBus.publish(Events.UpdateUser, response.body.user);
			}).catch(error => {
			console.log(error);
		});
	}

	addLogoutHandler() {
		const logoutLink = document.getElementById('logout_link');
		if (logoutLink) {
			logoutLink.addEventListener('click', () => {
				SessionModel.logOut()
					.then(response => {
						if (response.error) {
							console.log(response.error);
						} else {
							EventBus.publish(Events.ChangeRoute, {newUrl: Urls.MainUrl});
						}
					})
					.catch(error => {
						console.log(error);
					});
			});
		}

	}

	onDestroy() {
		EventBus.unSubscribe(this.state.eventName, this.updateUser);
	}
}

export default Profile;
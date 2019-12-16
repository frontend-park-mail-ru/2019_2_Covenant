import BaseComponent from '../../common/BaseComponent/BaseComponent';
import template from './Profile.pug';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import SessionModel from '../../models/SessionModel';
import Urls from '../../services/Urls';
import UserModel from '../../models/UserModel';
import {formatServerRoot} from '../../services/Utils';
import File from '../../common/Kit/File/File';
import SubscriptionModel from '../../models/SubscriptionModel';

class Profile extends BaseComponent {
	constructor({anotherProfile = false, eventName = ''} = {}) {
		const initialState = {
			anotherProfile: anotherProfile,
			eventName: eventName,
			user: null,
			forFollow: true
		};
		super(template, initialState);
		this.state = initialState;

		this.updateUser = this.updateUser.bind(this);
		this.onUploadAvatar = this.onUploadAvatar.bind(this);
		this.addFollowBtn = this.addFollowBtn.bind(this);
		this.addUnfollowBtn = this.addUnfollowBtn.bind(this);
		EventBus.subscribe(eventName, this.updateUser);
	}

	onRender() {
		const photo = this.state.user ? this.state.user.avatar : null;
		this.photoInput = new File({
			src: photo,
			accept: '.jpeg, .jpg, .png',
			disabled: this.state.anotherProfile ? 'disabled' : null,
			onUpload: this.onUploadAvatar
		});
		this.photoInput.render('avatar');

		this.addLogoutHandler();
		this.addFollowBtn();
		this.addUnfollowBtn();
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

	addBtn({id = '', promise = () => {}, forFollow = false} ={} ) {
		const btn = document.getElementById(id);
		if (btn) {
			btn.addEventListener('click', () => {
				promise()
				.then(response => {
					if (response.error) {
						console.log(response.error);
					}
					this.state.forFollow = forFollow;
					this.update(this.state);
				})
				.catch(error => {
					console.log(error);
				});
			});
		}
	}

	addFollowBtn() {
		if (!this.state.user) {
			return;
		}

		this.addBtn({
			id: 'follow-btn',
			promise: () => {return SubscriptionModel.subscribe(this.state.user.id);},
			forFollow: false
		});
	}

	addUnfollowBtn() {
		if (!this.state.user) {
			return;
		}

		this.addBtn({
			id: 'unfollow-btn',
			promise: () => {return SubscriptionModel.unsubscribe(this.state.user.id);},
			forFollow: true
		});
	}
}

export default Profile;
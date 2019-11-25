import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Profile.pug';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import SessionModel from '../../models/SessionModel';
import Urls from '../../services/Urls';
import UserModel from '../../models/UserModel';
import Avatar from '../Avatar/Avatar';

class Profile extends BaseComponent {
	constructor() {
		super(template);

		this.updateUser = this.updateUser.bind(this);
		this.onUploadAvatar = this.onUploadAvatar.bind(this);
		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	onRender() {
		this.mountAvatar();

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

	updateUser(data) {
		this.update({user: data});
	}

	mountAvatar() {
		const avatar = new Avatar({
			width: 150,
			height: 150,
			accept: '.jpg, .jpeg, .png',
			onUpload: this.onUploadAvatar
		});
		avatar.render('avatar');
	}

	onUploadAvatar(file) {
		UserModel.uploadAvatar(file)
			.then(response => {
				EventBus.publish(Events.UpdateUser, response.body);
			}).catch(error => {
			console.log(error);
		});
	}
}

export default Profile;
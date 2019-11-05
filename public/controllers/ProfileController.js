import UserModel from '../models/UserModel';
import Events from '../services/Events';
import EventBusModule from '../services/EventBus';
import BasePageController from './BasePageController';
import Avatar from '../components/Avatar/Avatar';
import EditableField from '../components/EditableField/EditableField';

const EventBus = new EventBusModule();

class ProfileController extends BasePageController {
	constructor(view) {
		super(view);
		this.title = 'Profile Page';

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

		this.page = {
			tabs: tabs,
			user: null
		};

		this.onSave = this.onSave.bind(this);
		this.onUploadAvatar = this.onUploadAvatar.bind(this);
	}

	onShow() {
		super.onShow();

		this.mountProfile();
		this.mountAvatar();
		this.mountEditableName();
	}

	mountAvatar() {
		const avatar = new Avatar({
			width: 120,
			height: 120,
			accept: '.jpg, .jpeg, .png',
			onUpload: this.onUploadAvatar
		});
		avatar.render('avatar');
	}

	mountProfile() {
		UserModel.getProfile()
			.then(response => {
				this.page.user = response.user;
				EventBus.publish(Events.UpdateUser, response.user);
			})
			.catch(error => {
				console.log(error);
			});
	}

	mountEditableName() {
		const editableField = new EditableField({
			onSave: this.onSave
		});
		editableField.render('info-user');
	}

	onSave(fieldValue) {
		const name = fieldValue;
		if(!name || name === '')
			return;

		UserModel.updateProfile(name)
		.then(response => {
			console.log(response);
			this.page.user = response.user;
			EventBus.publish(Events.UpdateUser, response.user);
		}).catch(error => {
			console.log(error);
		});
	}

	onUploadAvatar(file) {
		UserModel.uploadAvatar(file)
		.then(response => {
			this.page.user.avatar = response.avatar;
			EventBus.publish(Events.UpdateUser, this.page.user);
		}).catch(error => {
			console.log(error);
		});
	}
}

export default ProfileController;

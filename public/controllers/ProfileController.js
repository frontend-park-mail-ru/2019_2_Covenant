import UserModel from '../models/UserModel';
import Events from '../services/Events';
import EventBusModule from '../services/EventBus';
import BasePageController from './BasePageController';
import Avatar from '../components/Avatar/Avatar';

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
			edit: false,
			tabs: tabs,
			user: null
		};

		this.onEdit = this.onEdit.bind(this);
		this.onSave = this.onSave.bind(this);
		this.onUploadAvatar = this.onUploadAvatar.bind(this);
	}

	onShow() {
		super.onShow();

		this.mountProfile();
		this.mountAvatar();
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

				this.createHandlers();
			})
			.catch(error => {
				console.log(error);
			});
	}

	createHandlers() {
		const editInfo = document.getElementById('edit_pencil');
		if (editInfo) {
			editInfo.addEventListener('click', this.onEdit);
		}
	}

	createSaveHandler() {
		const saveInfo = document.getElementById('save_info');
		if(saveInfo) {
			saveInfo.addEventListener('click', this.onSave);
		}
	}

	onEdit() {
		this.page.edit = true;
		this.updateProfile(this.page);
		this.createSaveHandler();
	}

	onSave() {
		const self = this;
		self.page.edit = false;

		const name = document.getElementById('profile__name__input').value;
		if(!name || name === '')
			return;

		UserModel.updateProfile(name)
		.then(response => {
			console.log(response);
			self.page.user = response.user;
			self.updateProfile(self.page);
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

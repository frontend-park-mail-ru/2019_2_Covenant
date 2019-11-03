import BasePageController from './BasePageController';
import UserModel from '../models/UserModel';

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
	}

	onShow() {
		super.onShow();

		const self = this;

		UserModel.getProfile()
		.then(response => {
			self.page.user = response.user;
			self.updateProfile(self.page);
			self.createHandlers();
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

		const avatarUpload = document.getElementById('avatar_upload_input');
		if(avatarUpload) {
			avatarUpload.addEventListener('change', this.onUploadAvatar);
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

	onUploadAvatar() {
		const self = this;
		const imageInput = document.getElementById('avatar_upload_input');
		const file = imageInput.files[0];

		UserModel.uploadAvatar(file)
		.then(response => {
			console.log(response);
			self.page.user.avatar = response.avatar;
			self.updateProfile(self.page);
		}).catch(error => {
			console.log(error);
		});
	}

	updateProfile(data) {
		this.view.updateView(data);
	}
}

export default ProfileController;

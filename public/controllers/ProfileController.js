import UserModel from '../models/UserModel';
import Events from '../services/Events';
import EventBusModule from '../services/EventBus';
import Avatar from '../components/Avatar/Avatar';
import EditableField from '../components/EditableField/EditableField';
import BaseController from "./BaseController";
import Header from "../components/Header/Header";
import Urls from "../services/Urls";

const EventBus = new EventBusModule();

class ProfileController extends BaseController {
	constructor(view) {
		super(view);
		this.title = 'Profile Page';

		this.page = {
			user: null
		};

		this.onSave = this.onSave.bind(this);
		this.onUploadAvatar = this.onUploadAvatar.bind(this);
	}

	onShow() {
		UserModel.getProfile().then(response =>
		{
			if (response.error) {
				EventBus.publish(Events.ChangeRoute, Urls.LoginUrl);
			} else {
				this.mountHeader();
				this.mountAvatar();
				this.mountEditableName();

				EventBus.publish(Events.UpdateUser, response.body);

				console.log(response);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	mountHeader() {
		const header = new Header();
		header.render('header');
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
			if (!response.error) {
				this.page.user = response.body;
				EventBus.publish(Events.UpdateUser, response.body);
			}
		}).catch(error => {
			console.log(error);
		});
	}

	onUploadAvatar(file) {
		UserModel.uploadAvatar(file)
		.then(response => {
			this.page.user = response.body;
			EventBus.publish(Events.UpdateUser, this.page.user);
		}).catch(error => {
			console.log(error);
		});
	}
}

export default ProfileController;

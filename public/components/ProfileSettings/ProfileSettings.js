import BaseComponent from '../BaseComponent/BaseComponent';
import template from './ProfileSettings.pug';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import Input from '../Input/Input';
import UserModel from '../../models/UserModel';

class ProfileSettings extends BaseComponent {
	constructor() {
		super(template);

		this.updateUser = this.updateUser.bind(this);
		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	onRender() {
		this.createInputs();
		this.addHandlers();
	}

	createInputs() {
		this.emailInput = new Input({
			inputId: 'settings-email'
		});
		this.nicknameInput = new Input({
			inputId: 'settings-nickname'
		});
		this.oldPasswordInput = new Input({
			inputId: 'settings-password'
		});
		this.passwordInput = new Input({
			inputId: 'settings-new-password'
		});
		this.repeatPasswordInput = new Input({
			inputId: 'settings-repeat-password'
		});
	}

	addHandlers() {
		const updateBtn = document.getElementById('btn-update-profile');
		if (updateBtn) {
			updateBtn.addEventListener('click', () => {
				UserModel.updateProfileInfo({
					nickname: this.nicknameInput.value,
					email: this.emailInput.value
				}).then(response => {
					EventBus.publish(Events.UpdateUser, response.body.user);
				}).catch(error => {
					console.log(error);
				});
			});
		}

		const saveBtn = document.getElementById('btn-save-profile');
		if (saveBtn) {
			saveBtn.addEventListener('click', () => {
				UserModel.updateProfilePassword({
					oldPassword: this.oldPasswordInput.value,
					password: this.passwordInput.value,
					passwordConfirm: this.repeatPasswordInput.value
				}).then(response => {
					console.log(response);
				}).catch(error => {
					console.log(error);
				});
			});
		}
	}

	updateUser(data) {
		this.update({user: data});
	}

	onDestroy() {
		EventBus.unSubscribe(Events.UpdateUser, this.updateUser);
	}
}

export default ProfileSettings;
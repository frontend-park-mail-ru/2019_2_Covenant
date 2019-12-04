import BaseComponent from '../BaseComponent/BaseComponent';
import template from './SignupForm.pug';
import Input from '../Input/Input';
import SessionModel from '../../models/SessionModel';
import Events from '../../services/Events';
import Urls from '../../services/Urls';
import EventBus from '../../services/EventBus';
import Link from '../Link/Link';

class SignUpForm extends  BaseComponent {
	constructor() {
		super(template);

		this.handlerSubmit();
	}

	onRender() {
		this.emailInput = new Input({
			inputId: 'signup__email_input'
		});
		this.nicknameInput = new Input({
			inputId: 'signup__nick_input'
		});
		this.passwordInput = new Input({
			inputId: 'signup__password_input'
		});

		this.repeatPasswordInput = new Input({
			inputId: 'signup__repeat_password_input'
		});

		new Link({elementId: 'login_link', eventType: 'click', route: Urls.LoginUrl});
	}

	handlerSubmit() {
		const element = this.element;

		element.addEventListener('submit', e => {
			e.preventDefault();
			this.clearErrors();

			if (this.isValid()) {
				this.submit();
			}
		});
	}

	clearErrors() {
		this.emailInput.clearError();
		this.nicknameInput.clearError();
		this.passwordInput.clearError();
		this.repeatPasswordInput.clearError();
	}

	isValid() {
		let valid = true;

		const emailValid = this.emailInput.value !== '';
		const passwordValid = this.passwordInput.value !== '';
		const nickValid = this.nicknameInput.value !== '';
		const repeatValid = this.passwordInput.value === this.repeatPasswordInput.value;
		if (!emailValid) {
			this.emailInput.setError('Please input your email.');
			valid = false;
		}

		if (!nickValid) {
			this.nicknameInput.setError('Please input your nickname.');
			valid = false;
		}

		if (!passwordValid) {
			this.passwordInput.setError('Please input your password.');
			valid = false;
		}

		if (!repeatValid) {
			this.repeatPasswordInput.setError('Password are not the same.');
			valid = false;
		}

		return valid;
	}

	/*
	setFormError(text) {
		const submitError = document.getElementsByClassName('signup__submit_error')[0];
		submitError.innerText = text;
	}
	*/

	submit() {
		const form = {
			email: this.emailInput.value,
			password: this.passwordInput.value,
			password_confirmation: this.repeatPasswordInput.value,
			nickname: this.nicknameInput.value
		};

		SessionModel.signUp(form)
			.then(response => {
				if (response.error) {
					console.log(response.error);
				} else {
					EventBus.publish(Events.ChangeRoute, { newUrl: Urls.ProfileUrl });
				}
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export default  SignUpForm;

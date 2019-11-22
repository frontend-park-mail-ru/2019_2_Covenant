import template from './LoginForm.pug';
import EventBus from '../../services/EventBus';
import SessionModel from '../../models/SessionModel';
import Events from '../../services/Events';
import Urls from '../../services/Urls';
import BaseComponent from '../BaseComponent/BaseComponent';
import Input from '../Input/Input';

class LoginForm extends BaseComponent {
	constructor() {
		super(template);

		this.emailInput = new Input({
			inputClass: 'login__email_input',
			errorClass: 'login__email_error',
			component: this.element
		});
		this.passwordInput = new Input({
			inputClass: 'login__password_input',
			errorClass: 'login__password_error',
			component: this.element
		});

		this.handlerSubmit();
	}

	isValid() {
		let valid = true;

		const emailValid = this.emailInput.value !== '';
		const passwordValid = this.passwordInput.value !== '';
		if (!emailValid) {
			this.emailInput.setError('Please input your email.');
			valid = false;
		}

		if (!passwordValid) {
			this.passwordInput.setError('Please input your password.');
			valid = false;
		}

		return valid;
	}

	setFormError(text) {
		const submitError = document.getElementsByClassName('login__error')[0];
		submitError.innerText = text;
	}

	submit() {
		const form = {
			email: this.emailInput.value,
			password: this.passwordInput.value
		};

		SessionModel.login(form)
			.then(response => {
				if (response.error) {
					this.setFormError(response.error);
				} else {
					EventBus.publish(Events.ChangeRoute, {newUrl: Urls.ProfileUrl});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	clearErrors() {
		this.emailInput.clearError();
		this.passwordInput.clearError();
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
}

export default LoginForm;

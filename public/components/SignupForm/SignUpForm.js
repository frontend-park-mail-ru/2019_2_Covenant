import BaseComponent from '../BaseComponent/BaseComponent';
import template from './SignupForm.pug';
import Input from '../Input/Input';
import SessionModel from '../../models/SessionModel';
import Events from '../../services/Events';
import Urls from '../../services/Urls';
import EventBusModule from '../../services/EventBus';

const EventBus = new EventBusModule();

class SignUpForm extends  BaseComponent {
	constructor() {
		super(template);

		this.emailInput = new Input({
			inputClass: 'signup__email_input',
			errorClass: 'signup__email_error',
			component: this.element
		});
		this.passwordInput = new Input({
			inputClass: 'signup__password_input',
			errorClass: 'signup__password_error',
			component: this.element
		});

		this.repeatPasswordInput = new Input({
			inputClass: 'signup__repeat_password_input',
			errorClass: 'signup__repeat_error',
			component: this.element
		});

		this.handlerSubmit();
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
		this.passwordInput.clearError();
		this.repeatPasswordInput.clearError();
	}

	isValid() {
		let valid = true;

		const emailValid = this.emailInput.value !== '';
		const passwordValid = this.passwordInput.value !== '';
		const repeatValid = this.passwordInput.value === this.repeatPasswordInput.value;
		if (!emailValid) {
			this.emailInput.setError('Please input your email.');
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

	submit() {
		const form = {
			email: this.emailInput.value,
			password: this.passwordInput.value
		};

		SessionModel.signUp(form)
			.then(() => {
				EventBus.publish(Events.ChangeRoute, { newUrl: Urls.ProfileUrl });
			})
			.catch(error => {
				console.log(error);
			});
	}
}

export default  SignUpForm;

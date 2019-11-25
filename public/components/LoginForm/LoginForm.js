import template from './LoginForm.pug';
import EventBus from '../../services/EventBus';
import SessionModel from '../../models/SessionModel';
import Events from '../../services/Events';
import Urls from '../../services/Urls';
import BaseComponent from '../BaseComponent/BaseComponent';
import Input from '../Input/Input';
import Link from '../Link/Link';

class LoginForm extends BaseComponent {
	constructor() {
		super(template);

		this.handlerSubmit();
	}

	onRender() {
		this.emailInput = new Input({
			inputId: 'login__email_input',
			errorId: 'login__email_error'
		});

		this.passwordInput = new Input({
			inputId: 'login__password_input',
			errorId: 'login__password_error'
		});

		new Link({elementId: 'no-account-link', eventType: 'click', route: Urls.SignupUrl});
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

	submit() {
		const form = {
			email: this.emailInput.value,
			password: this.passwordInput.value
		};

		SessionModel.login(form)
			.then(response => {
				if (response.error) {
					console.log(response.error);
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

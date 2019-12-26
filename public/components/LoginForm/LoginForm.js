import template from './LoginForm.pug';
import EventBus from '../../services/EventBus';
import SessionModel from '../../models/SessionModel';
import Events from '../../services/Events';
import Urls from '../../services/Urls';
import BaseComponent from '../../common/BaseComponent/BaseComponent';
import Input from '../../common/Kit/Input/Input';
import Link from '../../common/Kit/Link/Link';

class LoginForm extends BaseComponent {
	constructor() {
		super(template);

		this.handlerSubmit();
	}

	onRender() {
		this.emailInput = new Input({
			inputId: 'login__email_input',
			errorId: 'email-error-id'
		});

		this.passwordInput = new Input({
			inputId: 'login__password_input',
			errorId: 'password-error-id'
		});

		this.submitError =  new Input({
			errorId: 'submit-error-id'
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
					this.submitError.setError(response.error);
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
		this.submitError.clearError();
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

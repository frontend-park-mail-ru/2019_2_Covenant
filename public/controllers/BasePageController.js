import BaseController from './BaseController.js';
import EventBus from '../services/EventBus.js';
import Events from '../services/Events.js';
import Urls from '../services/Urls.js';

const eventBus = new EventBus();

class BasePageController extends BaseController {
	constructor(view) {
		super(view);
	}

	onShow() {
		this.createHeaderButtons();
	}

	onHide() {}

	createHeaderButtons() {
		const signup = document.getElementById('signup_link');
		if (signup)
			signup.addEventListener('click', this.signup);

		const login = document.getElementById('login_link');
		if (login)
			login.addEventListener('click', this.login);

		const main = document.getElementById('main_link');
		if (main)
			main.addEventListener('click', this.main);
	}

	signup() {
		eventBus.publish(Events.ChangeRoute, { newUrl:  Urls.SignupUrl});
	}

	login() {
		eventBus.publish(Events.ChangeRoute, { newUrl:  Urls.LoginUrl});
	}

	main() {
		eventBus.publish(Events.ChangeRoute, { newUrl:  Urls.MainUrl});
	}
}

export default BasePageController;

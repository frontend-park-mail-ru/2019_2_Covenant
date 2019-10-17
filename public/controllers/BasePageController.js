import BaseController from './BaseController.js';
import Link from '../components/Link/Link.js';
import Urls from '../services/Urls.js';

class BasePageController extends BaseController {
	constructor(view) {
		super(view);
	}

	onShow() {
		this.createHeaderButtons();
	}

	onHide() {}

	createHeaderButtons() {
		new Link('signup_link', 'click', Urls.SignupUrl);
		new Link('login_link', 'click', Urls.LoginUrl);
		new Link('main_link', 'click', Urls.MainUrl);
	}
}

export default BasePageController;

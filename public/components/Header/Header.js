import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Header.pug';
import Link from '../Link/Link';
import Urls from '../../services/Urls';

class Header extends BaseComponent {
	constructor() {
		super(template);
	}

	onRender() {
		new Link({elementId: 'signup_link', eventType: 'click', route: Urls.SignupUrl});
		new Link({elementId: 'login_link', eventType: 'click', route: Urls.LoginUrl});
		new Link({elementId: 'main_link', eventType: 'click', route: Urls.MainUrl});
	}

}

export default Header;

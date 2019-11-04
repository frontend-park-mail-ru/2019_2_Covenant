import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Header.pug';
import Link from '../Link/Link';
import Urls from '../../services/Urls';
import EventBusModule from '../../services/EventBus';
import Events from '../../services/Events';

const EventBus = new EventBusModule();

class Header extends BaseComponent {
	constructor() {
		super(template);

		this.updateUser = this.updateUser.bind(this);
		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	onRender() {
		new Link({elementId: 'signup_link', eventType: 'click', route: Urls.SignupUrl});
		new Link({elementId: 'login_link', eventType: 'click', route: Urls.LoginUrl});
		new Link({elementId: 'main_link', eventType: 'click', route: Urls.MainUrl});
	}

	updateUser(data) {
		this.update({ user: data});
	}
}

export default Header;

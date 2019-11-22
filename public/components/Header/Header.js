import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Header.pug';
import Link from '../Link/Link';
import Urls from '../../services/Urls';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import SessionModel from '../../models/SessionModel';
import { SERVER_ROOT } from '../../services/Settings';

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
		if (!data.avatar.includes(SERVER_ROOT)){
			data.avatar = `${SERVER_ROOT}${data.avatar}`;
		}
		this.update({ user: data});
		this.addProfileLink();
		this.addLogoutHandler();
	}

	addProfileLink() {
		new Link({elementId: 'profile_name', eventType: 'click', route: Urls.ProfileUrl});
		new Link({elementId: 'profile_avatar', eventType: 'click', route: Urls.ProfileUrl});
	}

	addLogoutHandler() {
		const btn = document.getElementById('logout_link');
		if (btn) {
			btn.addEventListener('click', () => {
				SessionModel.logOut()
				.then(response => {
					if (response.error) {
						console.log(response.error);
					} else {
						EventBus.publish(Events.ChangeRoute, Urls.MainUrl);
					}
				})
				.catch(error => {
					console.log(error);
				})
			});
		}
	}
}

export default Header;

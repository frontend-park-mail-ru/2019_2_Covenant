import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Profile.pug';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import SessionModel from '../../models/SessionModel';
import Urls from '../../services/Urls';

class Profile extends BaseComponent {
	constructor() {
		super(template);

		this.updateUser = this.updateUser.bind(this);
		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	onRender() {
		const logoutLink = document.getElementById('logout_link');
		if (logoutLink) {
			logoutLink.addEventListener('click', () => {
				SessionModel.logOut()
				.then(response => {
					if (response.error) {
						console.log(response.error);
					} else {
						EventBus.publish(Events.ChangeRoute, {newUrl: Urls.MainUrl});
					}
				})
				.catch(error => {
					console.log(error);
				});
			});
		}
	}

	updateUser(data) {
		this.update({user: data});
	}
}

export default Profile;
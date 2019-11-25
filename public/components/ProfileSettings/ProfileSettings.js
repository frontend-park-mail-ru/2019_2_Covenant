import BaseComponent from '../BaseComponent/BaseComponent';
import template from './ProfileSettings.pug';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';

class ProfileSettings extends BaseComponent {
	constructor() {
		super(template);

		this.updateUser = this.updateUser.bind(this);
		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	updateUser(data) {
		this.update({user: data});
	}
}

export default ProfileSettings;
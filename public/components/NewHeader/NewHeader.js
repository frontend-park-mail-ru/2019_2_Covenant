import BaseComponent from '../BaseComponent/BaseComponent';
import template from './NewHeader.pug';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import {SERVER_ROOT} from '../../services/Settings';
import Link from '../Link/Link';
import Urls from '../../services/Urls';

class NewHeader extends BaseComponent {
	constructor() {
		super(template);

		this.updateUser = this.updateUser.bind(this);
		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	updateUser(data) {
		if (!data.avatar.includes(SERVER_ROOT)){
			data.avatar = `${SERVER_ROOT}${data.avatar}`;
		}
		this.update({ user: data});
		this.addProfileLink();
	}

	addProfileLink() {
		new Link({elementId: 'profile_name', eventType: 'click', route: Urls.ProfileUrl});
		new Link({elementId: 'profile_avatar', eventType: 'click', route: Urls.ProfileUrl});
	}
}

export default NewHeader;
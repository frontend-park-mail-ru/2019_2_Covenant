import BaseComponent from '../../common/BaseComponent/BaseComponent';
import template from './NewHeader.pug';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import Link from '../../common/Kit/Link/Link';
import Urls from '../../services/Urls';
import SearchAutocomplete from '../SearchAutocomplete/SearchAutocomplete';
import {formatServerRoot} from '../../services/Utils';

class NewHeader extends BaseComponent {
	constructor({headerPositionClass = 'header__align-center', artistPage = false} = {}) {
		const initState = {headerPositionClass: headerPositionClass, artistPage: artistPage};
		super(template, initState);
		this.state = initState;

		this.updateUser = this.updateUser.bind(this);
		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	onRender() {
		new Link({elementId: 'signup_link', eventType: 'click', route: Urls.SignupUrl});
		new Link({elementId: 'login_link', eventType: 'click', route: Urls.LoginUrl});

		this.searchAutocomplete = new SearchAutocomplete();
		this.searchAutocomplete.render('search-container-id');
	}

	updateUser(data) {
		if (data.anotherProfile) {
			return;
		}

		formatServerRoot(data, 'avatar');
		this.state.user = data;
		this.update(this.state);
		this.addProfileLink();
	}

	addProfileLink() {
		new Link({elementId: 'profile_name', eventType: 'click', route: Urls.ProfileUrl});
		new Link({elementId: 'profile_avatar', eventType: 'click', route: Urls.ProfileUrl});
	}
}

export default NewHeader;
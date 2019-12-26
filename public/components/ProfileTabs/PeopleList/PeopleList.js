import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './PeopleList.pug';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import {formatServerRootForArray} from '../../../services/Utils';
import Urls from '../../../services/Urls';
import Link from '../../../common/Kit/Link/Link';

class PeopleList extends BaseComponent {
	constructor({
		loadItems = () => {},
		itemsName = '',
		eventName = '' }) {
		const initState = {
			items: []
		};
		super(template, initState);
		this.state  = initState;
		this.loadItems = loadItems;
		this.itemsName = itemsName;
		this.updateUser = this.updateUser.bind(this);

		EventBus.subscribe(eventName, this.updateUser);
	}

	updateUser(user) {
		this.loadItems(user)
			.then(response => {
				this.state.items = response.body[this.itemsName];
				formatServerRootForArray(this.state.items, 'avatar');
				this.update(this.state);
			})
			.catch(error => {
				console.log(error);
			});
	}

	onDestroy() {
		EventBus.unSubscribe(Events.UpdateUser, this.updateUser);
	}

	onRender() {
		this.state.items.forEach(item => {
			const url = `${Urls.ProfileUrl}/${item.nickname}?tab=Playlists`;
			new Link({elementId: `people-list-avatar-${item.nickname}`, eventType: 'click', route: url});
			new Link({elementId: `people-list-nick-${item.nickname}`, eventType: 'click', route: url});
		});
	}

}

export default PeopleList;
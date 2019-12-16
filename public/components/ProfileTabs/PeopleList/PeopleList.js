import BaseComponent from '../../BaseComponent/BaseComponent';
import template from './PeopleList.pug';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import {formatServerRootForArray} from '../../../services/Utils';

class PeopleList extends BaseComponent {
	constructor({loadItems = () => {}, itemsName = ''}) {
		const initState = {
			items: []
		};
		super(template, initState);
		this.state  = initState;
		this.loadItems = loadItems;
		this.itemsName = itemsName;
		this.updateUser = this.updateUser.bind(this);

		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	updateUser() {
		this.loadItems()
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

}

export default PeopleList;
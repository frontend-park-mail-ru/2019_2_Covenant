import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './PlaylistsTab.pug';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import {formatServerRootForArray} from '../../../services/Utils';

class PlaylistsTab extends BaseComponent {
	constructor({ eventName = '', loadItems = () => {}} = {}) {
		const initState = {
			items: [],
			eventName: eventName,
			loadItems: loadItems
		};
		super(template, initState);
		this.state  = initState;
		this.updateUser = this.updateUser.bind(this);

		EventBus.subscribe(eventName, this.updateUser);
	}

	updateUser(user) {
		this.state.loadItems(user)
			.then(response => {
				this.state.items = response.body.playlists;
				formatServerRootForArray(this.state.items, 'photo');
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
			const playlistHref = document.getElementById(`playlist-href-${item.id}`);
			if (playlistHref) {
				playlistHref.addEventListener('click', () => {
					EventBus.publish(Events.ChangeRoute, {newUrl: `/playlist/${item.id}`})
				});
			}
		});
	}
}

export default  PlaylistsTab;
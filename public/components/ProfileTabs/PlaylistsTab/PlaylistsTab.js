import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './PlaylistsTab.pug';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import {formatServerRootForArray} from '../../../services/Utils';
import PlaylistModel from '../../../models/PlaylistModel';
import Urls from '../../../services/Urls';

class PlaylistsTab extends BaseComponent {
	constructor() {
		const initState = {
			items: []
		};
		super(template, initState);
		this.state  = initState;
		this.updateUser = this.updateUser.bind(this);

		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	updateUser() {
		PlaylistModel.getPlaylists(20, 0)
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
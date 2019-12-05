import template from './Menu.pug';

import Link from '../../Link/Link';
import Urls from '../../../services/Urls';
import BaseComponent from '../../BaseComponent/BaseComponent';
import SessionModel from '../../../models/SessionModel';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';

class Menu extends BaseComponent {
	constructor() {
		const initialState = {
			items: []
		};
		super(template, initialState);

		this.state = initialState;
		this.renderItems();
	}

	renderItems() {
		this.state.items = this.getItems();
		this.update(this.state);

		this.state.items.forEach(item => {
			new Link({elementId: item.id, eventType: 'click', route: item.route});
		});
	}

	getItems() {
		return [
			{title: 'Artists', id: 'artists-id', route: Urls.AdminArtists},
			{title: 'Albums', id: 'albums-id', route: Urls.AdminAlbums},
			{title: 'Tracks', id: 'tracks-id', route: Urls.AdminTracks}
		];
	}

	onRender() {
		new Link({elementId: 'home-link', eventType: 'click', route: Urls.MainUrl});
		new Link({elementId: 'profile-link', eventType: 'click', route: Urls.ProfileUrl});

		const logoutLink = document.getElementById('logout-link');
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

export default Menu;
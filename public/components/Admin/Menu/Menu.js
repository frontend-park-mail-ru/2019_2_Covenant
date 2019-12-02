import template from './Menu.pug';

import Link from '../../Link/Link';
import Urls from '../../../services/Urls';
import BaseComponent from '../../BaseComponent/BaseComponent';

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
			{title: 'Genres', id: 'genres-id', route: Urls.AdminGenres },
			{title: 'Artists', id: 'artists-id', route: Urls.AdminArtists},
			{title: 'Albums', id: 'albums-id', route: Urls.AdminAlbums},
			{title: 'Tracks', id: 'tracks-id', route: Urls.AdminTracks}
		];
	}
}

export default Menu;
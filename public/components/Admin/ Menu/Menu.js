import template from './Menu.pug';

import AdminBaseComponent from '../AdminBaseComponent/AdminBaseComponent';
import Link from '../../Link/Link';
import Urls from '../../../services/Urls';

class Menu extends AdminBaseComponent {
	constructor() {
		const initialState = {
			items: []
		};
		super(template);

		this.state = initialState;
	}

	renderCallback() {
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
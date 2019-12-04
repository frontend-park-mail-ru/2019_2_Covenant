import BaseComponent from '../BaseComponent/BaseComponent';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import template from './Menu.pug';
import Link from '../Link/Link';
import Urls from '../../services/Urls';
import {UserRole} from '../../models/UserModel';

class Menu extends BaseComponent {
	constructor() {
		const initialState = {
			defaultMenuItems: [],
			userMenuItems: [],
			adminMenuItems: []
		};
		super(template, initialState);
		this.state = initialState;
		this.updateUser = this.updateUser.bind(this);
		EventBus.subscribe(Events.UpdateUser, this.updateUser);

		this.renderDefaultMenuItems();
	}

	getDefaultMenuItems() {
		return [
			{title: 'Home', imgPath: 'img/home.png', id: 'menu-home-link'},
			{title: 'Collections', imgPath: 'img/playlist.png', id: 'menu-collections-link'},
			{title: 'Genres', imgPath: 'img/musical-note.png', id: 'menu-genres-link'},
			{title: 'Albums', imgPath: 'img/music-folder.png', id: 'menu-albums-link'},
			{title: 'Artists', imgPath: 'img/micro.png', id: 'menu-artists-link'},
			{title: 'Search', imgPath: 'img/search-gray.png', id: 'menu-search-link'}
		];
	}

	getUserMenuItems() {
		return [
			{title: 'History', imgPath: 'img/history.png', id: 'menu-history-link'},
			{title: 'Favourite', imgPath: 'img/fav.png', id: 'menu-fav-link'},
			{title: 'Playlists', imgPath: 'img/playlists.png', id: 'menu-playlists-link'},
			{title: 'Friends', imgPath: 'img/friends.png', id: 'menu-friends-link'},
			{title: 'Feed', imgPath: 'img/feed.png', id: 'menu-feed-link'},
		];
	}

	getAdminMenuItems() {
		return [
			{title: 'Artists', imgPath: 'img/micro.png', id: 'admin-artists-link'},
			{title: 'Albums', imgPath: 'img/music-folder.png', id: 'admin-albums-link'},
			{title: 'Tracks', imgPath: 'img/musical-note.png', id: 'admin-tracks-link'}
		];
	}

	updateUser(user) {
		if (user.role === UserRole.Admin) {
			this.renderAdminMenuItems();
		} else {
			this.renderUserMenuItems();
		}
	}

	renderDefaultMenuItems() {
		this.state.defaultMenuItems = this.getDefaultMenuItems();
		this.update(this.state);
	}

	renderUserMenuItems() {
        this.state.userMenuItems = this.getUserMenuItems();
        this.update(this.state);
	}

	renderAdminMenuItems() {
		this.state.adminMenuItems = this.getAdminMenuItems();
		this.update(this.state);
	}

	onRender() {
		new Link({elementId: 'main_link', eventType: 'click', route: Urls.MainUrl});
		new Link({elementId: 'admin-artists-link', eventType: 'click', route: Urls.AdminArtists});
		new Link({elementId: 'admin-albums-link', eventType: 'click', route: Urls.AdminAlbums});
    }
}

export default Menu;
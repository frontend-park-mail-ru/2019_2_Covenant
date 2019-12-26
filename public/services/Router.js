'use strict';

// Controllers
import LoginController from '../controllers/LoginController.js';
import SignupController from '../controllers/SignupController.js';
import ProfileController from '../controllers/ProfileController';
import {
	AlbumController,
	AlbumsController,
	ArtistsController,
	CollectionsController,
	HomeController,
	PlaylistController,
	PlayListsController,
	SearchController
} from '../controllers/ContentController';

// Views
import emptyView from '../views/EmptyView/EmptyView';

// Utils
import Urls from './Urls.js';
import Events from './Events';
import EventBus from './EventBus';
import {
	AdminAlbumEditorController,
	AdminAlbumsController,
	AdminArtistsController,
	AdminCollectionEditorController,
	AdminCollectionsController,
	AdminTrackEditorController,
	AdminTracksController
} from '../controllers/AdminController';
import {AdminArtistEditorController} from '../controllers/AdminController';
import AnotherProfileController from '../controllers/AnotherProfileController';
import ArtistController from '../controllers/ArtistController';

class Router {
	constructor() {
		this.routes = [];
		this.register(Urls.MainUrl, new HomeController());
		this.register(Urls.LoginUrl, new LoginController(emptyView));
		this.register(Urls.SignupUrl, new SignupController(emptyView));
		this.registerRegexp(new RegExp('^' + Urls.ProfileUrl + '(\\?tab=\\w+)?$'), new ProfileController());
		this.registerRegexp(new RegExp('^' + Urls.ProfileUrl + '(/\\w+)(\\?tab=\\w+)?$'), new AnotherProfileController());
		this.register(Urls.CollectionsUrl, new CollectionsController());
		this.register(Urls.ALbumsUrl, new AlbumsController());
		this.register(Urls.ArtistsUrl, new ArtistsController());

		this.register(Urls.AdminArtists, new AdminArtistsController());
		this.register(Urls.AdminArtistEditor, new AdminArtistEditorController());
		this.register(Urls.AdminAlbums, new AdminAlbumsController());
		this.register(Urls.AdminAlbumEdtior, new AdminAlbumEditorController());
		this.register(Urls.AdminTracks, new AdminTracksController());
		this.register(Urls.AdminTrackEditor, new AdminTrackEditorController());
		this.register(Urls.AdminCollections, new AdminCollectionsController());
		this.register(Urls.AdminCollectionEditor, new AdminCollectionEditorController());
		this.registerRegexp(new RegExp('^'+ Urls.SearchUrl + '(\\?s=?(\\w+))?$'), new SearchController());

		this.register(Urls.PlaylistsUrl, new PlayListsController());
		this.register(Urls.AlbumURl, new AlbumController());
		this.register(Urls.ArtistUrl, new ArtistController());
		this.register(Urls.PlaylistUrl, new PlaylistController());

		this.eventHandler = this.eventHandler.bind(this);
		EventBus.subscribe(Events.ChangeRoute, this.eventHandler);
	}

	changeUrl(newUrl) {
		if (this.currentView)
			this.currentView.hide();

		this.currentView = this.getView(newUrl);
		if (!this.currentView) {
			newUrl = Urls.MainUrl;
			this.currentView = this.getView(newUrl);
		}

		if (window.location.pathname !== newUrl) {
			window.history.pushState(null, null, newUrl);
		}

		this.currentView.show();
	}

	eventHandler(event) {
		this.changeUrl(event.newUrl);
	}

	start() {
		window.addEventListener('popstate', () => {
			const newUrl = window.location.pathname;
			this.changeUrl(newUrl);
		});

		const newUrl = window.location.pathname;
		this.changeUrl(newUrl);
	}

	getView(url) {
		let view = null;
		this.routes.forEach(route => {
			let res = url.match(route.pattern);
			if (res) {
				view = route.controller;
			}
		});
		return view;
	}

	register(url, controller) {
		this.registerRegexp(new RegExp('^'+ url.replace(/:\w+/, '(-?\\d+)')+'$'), controller);
	}

	registerRegexp(regExp, controller) {
		this.routes.push({
			pattern: regExp,
			controller: controller
		});
	}
}

export default Router;

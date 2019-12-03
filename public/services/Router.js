'use strict';

// Controllers
import LoginController from '../controllers/LoginController.js';
import SignupController from '../controllers/SignupController.js';
import ProfileController from '../controllers/ProfileController';
import ContentController from '../controllers/ContentController';

// Views
import profileView from '../views/ProfileView/ProfileView';
import homeView from '../views/HomeView/HomeView';
import emptyView from '../views/EmptyView/EmptyView';

// Utils
import Urls from './Urls.js';
import Events from './Events';
import EventBus from './EventBus';
import {AdminArtistsController} from '../controllers/AdminController';
import {AdminArtistEditorController} from '../controllers/AdminController';

class Router {

	constructor() {

		this.routes = [];
		this.register(Urls.MainUrl, new ContentController(homeView));
		this.register(Urls.LoginUrl, new LoginController(emptyView));
		this.register(Urls.SignupUrl, new SignupController(emptyView));
		this.register(Urls.ProfileUrl, new ProfileController(profileView));
		this.register(Urls.AdminArtistEditor, new AdminArtistEditorController());
		this.register(Urls.AdminArtists, new AdminArtistsController());

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
		this.routes.push({
			pattern: new RegExp('^'+ url.replace(/:\w+/, '(\\w+)')+'$'),
			controller: controller
		});
	}
}

export default Router;

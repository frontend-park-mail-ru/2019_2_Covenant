// Controllers
import MainController from '../controllers/MainController.js';
import LoginController from '../controllers/LoginController.js';
import SignupController from '../controllers/SignupController.js';
import ProfileController from '../controllers/ProfileController';

// Views
import mainView from '../views/MainView/MainView.js';
import profileView from '../views/ProfileView/ProfileView';

// Utils
import Urls from './Urls.js';
import Events from './Events';
import EventBusModule from './EventBus';

const EventBus = new EventBusModule();

class Router {

	constructor() {

		this.routes = {};
		this.routes[Urls.MainUrl] = new MainController(mainView);
		this.routes[Urls.LoginUrl] = new LoginController(mainView);
		this.routes[Urls.SignupUrl] = new SignupController(mainView);
		this.routes[Urls.ProfileUrl]= new ProfileController(profileView);

		this.eventHandler = this.eventHandler.bind(this);
		EventBus.subscribe(Events.ChangeRoute, this.eventHandler);
	}

	changeUrl(newUrl) {
		if (this.currentView)
			this.currentView.hide();

		this.currentView = this.routes[newUrl];
		if (!this.currentView) {
			newUrl = Urls.MainUrl;
			this.currentView = this.routes[newUrl];
		}

		if (window.location.pathname !== newUrl) {
			window.history.pushState(null, this.currentView.title, newUrl);
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
}

export default Router;

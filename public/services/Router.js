// Controllers
import MainController from '../controllers/MainController.js';
import LoginController from '../controllers/LoginController.js';
import SignupController from '../controllers/SignupController.js';

// Views
import mainView from '../views/MainView/MainView.js';
import loginView from '../views/LoginView/LoginView.js';
import signupView from '../views/SignupView/SignupView.js';

// Utils
import Urls from './Urls.js';

class Router {

	constructor() {

		this.routes = {};
		this.routes[Urls.MainUrl] = new MainController(mainView);
		this.routes[Urls.LoginUrl] = new LoginController(loginView);
		this.routes[Urls.SignupUrl] = new SignupController(signupView);

		this.currentView = this.routes[Urls.MainUrl];
		this.currentView.show();

		this.eventHandler = this.eventHandler.bind(this);
	}

	changeUrl(newUrl, pushState = true) {
		this.currentView.hide();
		this.currentView = this.routes[newUrl];
		if (pushState)
			window.history.pushState({}, this.currentView.title, newUrl);
		this.currentView.show();
	}

	popState() {
		this.changeUrl(window.location.pathname, false);
	}

	eventHandler(event) {
		this.changeUrl(event.newUrl);
	}

}

export default Router;

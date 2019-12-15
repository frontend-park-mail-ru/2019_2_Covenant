import BaseController from './BaseController';
import profileView from '../views/ProfileView/ProfileView';
import Urls from '../services/Urls';
import UserModel from '../models/UserModel';
import EventBus from '../services/EventBus';
import Events from '../services/Events';
import Profile from '../components/Profile/Profile';
import NewHeader from '../components/NewHeader/NewHeader';
import Menu from '../components/Menu/Menu';
import Player from '../components/Player/Player';

class AnotherProfileController extends BaseController {
	constructor() {
		super(profileView);
	}

	onShow() {
		const pattern = new RegExp('^' + Urls.ProfileUrl + '(/(\\w+))?$');
		const url = window.location.pathname;
		const params = url.match(pattern);
		if (!params[2]) {
			EventBus.publish(Events.ChangeRoute, {newUrl: Urls.MainUrl});
		}

		const nick = params[2];
		UserModel.getProfile()
			.then(response => {
				if (response.error) { return; }
				this.renderContent();
				EventBus.publish(Events.UpdateUser, response.body.user);
			})
			.catch(error => {
				console.log(error);
			});

		UserModel.getProfileByNickname(nick)
			.then(response => {
				if (response.error || response.message) {
					EventBus.publish(Events.ChangeRoute, {newUrl: Urls.MainUrl});
					return;
				}
				this.renderAnotherProfileComponents();
				const user = response.body.user;
				EventBus.publish(Events.UpdateAnotherUser, user);
			})
			.catch(error => {
				console.log(error);
			});
	}

	renderContent() {
		const header = new NewHeader();
		header.render('header');

		const menu = new Menu();
		menu.render('menu');

		this.player = Player.getInstance();
		this.player.render('player-id');
	}


	renderAnotherProfileComponents() {
		this.profile = new Profile({
			anotherProfile: true,
			eventName: Events.UpdateAnotherUser
		});
		this.profile.render('user-info');
	}

	onHide() {
		this.profile.onDestroy();
	}
}

export default AnotherProfileController;
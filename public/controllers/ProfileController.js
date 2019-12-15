import UserModel from '../models/UserModel';
import Events from '../services/Events';
import EventBus from '../services/EventBus';
import BaseController from './BaseController';
import Urls from '../services/Urls';
import NewHeader from '../components/NewHeader/NewHeader';
import Menu from '../components/Menu/Menu';
import Profile from '../components/Profile/Profile';
import ProfileSettings from '../components/ProfileSettings/ProfileSettings';
import Player from '../components/Player/Player';
import profileView from '../views/ProfileView/ProfileView';

class ProfileController extends BaseController {
	constructor() {
		super(profileView);
	}

	onShow() {
		UserModel.getProfile()
		.then(response => {
			if (response.error || response.message) {
				EventBus.publish(Events.ChangeRoute, {newUrl: Urls.MainUrl});
				return;
			}
			this.renderContent();
			this.renderProfileComponents();
			const user = response.body.user;
			EventBus.publish(Events.UpdateUser, user);
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

		const player = new Player();
		player.render('player-id');
	}

	renderProfileComponents() {
		this.profile = new Profile({
			eventName: Events.UpdateUser
		});
		this.profile.render('user-info');

		this.settings = new ProfileSettings();
		this.settings.render('user-tabs');
	}

	onHide() {
		this.profile.onDestroy();
		this.settings.onDestroy();
	}
}

export default ProfileController;

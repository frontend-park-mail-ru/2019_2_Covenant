import UserModel from '../models/UserModel';
import Events from '../services/Events';
import EventBus from '../services/EventBus';
import BaseController from './BaseController';
import Urls from '../services/Urls';
import NewHeader from '../components/NewHeader/NewHeader';
import Menu from '../components/Menu/Menu';
import Profile from '../components/Profile/Profile';
import Player from '../components/Player/Player';
import profileView from '../views/ProfileView/ProfileView';
import ProfileTabs from '../components/ProfileTabs/ProfileTabs';

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

		this.player = Player.getInstance();
		this.player.render('player-id');
	}

	renderProfileComponents() {
		this.profile = new Profile({
			eventName: Events.UpdateUser
		});
		this.profile.render('user-info');

		this.tabs = new ProfileTabs(this.getTabFromUrl());
		this.tabs.render('user-tabs');
	}

	getTabFromUrl() {
		const pattern = new RegExp('^' + Urls.ProfileUrl + '(\\?tab=(\\w+))?$');
		const url = `${window.location.pathname}${window.location.search}`;
		const params = url.match(pattern);
		if (!params) {
			return 'Settings';
		}
		return params[2];
	}

	onHide() {
		this.profile.onDestroy();
		this.tabs.onDestroy();
	}
}

export default ProfileController;

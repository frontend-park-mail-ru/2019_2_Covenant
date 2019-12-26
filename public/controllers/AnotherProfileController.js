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
import ProfileTabs from '../components/ProfileTabs/ProfileTabs';
import PlaylistsTab from '../components/ProfileTabs/PlaylistsTab/PlaylistsTab';
import FollowersTab from '../components/ProfileTabs/FollowersTab/FollowersTab';
import FollowingTab from '../components/ProfileTabs/FollowingTab/FollowingTab';

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
				if (response.error) {
					EventBus.publish(Events.ChangeRoute, {newUrl: Urls.LoginUrl});
					return;
				}
				this.renderContent();
				EventBus.publish(Events.UpdateUser, response.body.user);
			})
			.catch(error => {
				console.log(error);
			});

		UserModel.getProfileByNickname(nick)
			.then(response => {
				if (response.error) {
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

	getProfileTabs() {
		return [
			{name: 'Playlists', id: 'tab-playlists-id', component: new PlaylistsTab({
					eventName: Events.UpdateAnotherUser,
					loadItems: (user) => {return UserModel.getPlaylists(user.id, 20, 0);}
				})},
			{name: 'Followers', id: 'tab-followers-id', component: new FollowersTab({
					eventName: Events.UpdateAnotherUser,
					loadItems: (user) => {return UserModel.getSubscriptions(user.id, 20, 0);}
				})},
			{name: 'Following', id: 'tab-following-id', component: new FollowingTab({
					eventName: Events.UpdateAnotherUser,
					loadItems: (user) => {return UserModel.getSubscriptions(user.id, 20, 0);}
				})},
		];
	}

	renderAnotherProfileComponents() {
		this.profile = new Profile({
			anotherProfile: true,
			eventName: Events.UpdateAnotherUser
		});
		this.profile.render('user-info');

		this.tabs = new ProfileTabs('Playlists', this.getProfileTabs());
		this.tabs.render('user-tabs');
	}

	onHide() {
		if (!this.profile || !this.tabs) {return;}
		this.profile.onDestroy();
		this.tabs.onDestroy();
	}
}

export default AnotherProfileController;
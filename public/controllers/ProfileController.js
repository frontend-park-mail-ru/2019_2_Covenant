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
import {getTabFromUrl} from '../services/Utils';
import PlaylistsTab from '../components/ProfileTabs/PlaylistsTab/PlaylistsTab';
import FavouritesTab from '../components/ProfileTabs/FavouritesTab/FavouritesTab';
import FollowersTab from '../components/ProfileTabs/FollowersTab/FollowersTab';
import FollowingTab from '../components/ProfileTabs/FollowingTab/FollowingTab';
import ProfileSettings from '../components/ProfileTabs/ProfileSettings/ProfileSettings';
import PlaylistModel from '../models/PlaylistModel';
import SubscriptionModel from '../models/SubscriptionModel';

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

	getProfileTabs() {
		return [
			{name: 'Playlists', id: 'tab-playlists-id', component: new PlaylistsTab({
					eventName: Events.UpdateUser,
					loadItems: () => { return PlaylistModel.getPlaylists(20, 0);}
				})},
			{name: 'Favourite', id: 'tab-favourite-id', component: new FavouritesTab()},
			{name: 'Followers', id: 'tab-followers-id', component: new FollowersTab({
					eventName: Events.UpdateUser,
					loadItems: () => {return SubscriptionModel.getSubscriptions(20, 0);}
				})},
			{name: 'Following', id: 'tab-following-id', component: new FollowingTab({
					eventName: Events.UpdateUser,
					loadItems: () => {return SubscriptionModel.getSubscriptions(20, 0);}
				})},
			{name: 'Settings',  id: 'tab-settings-id', component: new ProfileSettings()}
		];
	}

	renderProfileComponents() {
		this.profile = new Profile({
			eventName: Events.UpdateUser
		});
		this.profile.render('user-info');

		this.tabs = new ProfileTabs(getTabFromUrl('Settings'), this.getProfileTabs());
		this.tabs.render('user-tabs');
	}

	onHide() {
		this.profile.onDestroy();
		this.tabs.onDestroy();
	}
}

export default ProfileController;

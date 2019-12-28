import BaseComponent from '../../common/BaseComponent/BaseComponent';
import template from './ProfilePage.pug';
import PlaylistsTab from '../ProfileTabs/PlaylistsTab/PlaylistsTab';
import Events from '../../services/Events';
import PlaylistModel from '../../models/PlaylistModel';
import FavouritesTab from '../ProfileTabs/FavouritesTab/FavouritesTab';
import FollowersTab from '../ProfileTabs/FollowersTab/FollowersTab';
import SubscriptionModel from '../../models/SubscriptionModel';
import FollowingTab from '../ProfileTabs/FollowingTab/FollowingTab';
import ProfileSettings from '../ProfileTabs/ProfileSettings/ProfileSettings';
import Profile from '../Profile/Profile';
import ProfileTabs from '../ProfileTabs/ProfileTabs';
import {getTabFromUrl} from '../../services/Utils';

class ProfilePage extends BaseComponent {
	constructor() {
		super(template);

		this.renderProfileComponents = this.renderProfileComponents.bind(this);

		this.profile = new Profile({
			eventName: Events.UpdateUser
		});
		this.tabs = new ProfileTabs(getTabFromUrl('Settings'), this.getProfileTabs());
	}

	onRender() {
		this.renderProfileComponents();
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
		this.profile.render('user-info');
		this.tabs.render('user-tabs');
	}

	onDestroy() {
		this.profile.onDestroy();
		this.tabs.onDestroy();
	}
}


export default ProfilePage;
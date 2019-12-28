import BaseComponent from '../../common/BaseComponent/BaseComponent';
import template from './AnotherProfilePage.pug';
import Urls from '../../services/Urls';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import UserModel from '../../models/UserModel';
import PlaylistsTab from '../ProfileTabs/PlaylistsTab/PlaylistsTab';
import FollowersTab from '../ProfileTabs/FollowersTab/FollowersTab';
import FollowingTab from '../ProfileTabs/FollowingTab/FollowingTab';
import Profile from '../Profile/Profile';
import ProfileTabs from '../ProfileTabs/ProfileTabs';

class AnotherProfilePage extends BaseComponent {
	constructor() {
		super(template);

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

	onDestroy() {
		if (!this.profile || !this.tabs) {return;}
		this.profile.onDestroy();
		this.tabs.onDestroy();
	}
}

export default AnotherProfilePage;
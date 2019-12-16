import BaseComponent from '../BaseComponent/BaseComponent';
import template from './ProfileTabs.pug';
import ProfileSettings from './ProfileSettings/ProfileSettings';
import FollowingTab from './FollowingTab/FollowingTab';
import FollowersTab from './FollowersTab/FollowersTab';
import FavouritesTab from './FavouritesTab/FavouritesTab';
import PlaylistsTab from './PlaylistsTab/PlaylistsTab';


class ProfileTabs extends BaseComponent {
	constructor(currentTabName) {
		const initialState = {
			tabs: [
				{name: 'Playlists', id: 'tab-playlists-id', component: new PlaylistsTab()},
				{name: 'Favourite', id: 'tab-favourite-id', component: new FavouritesTab()},
				{name: 'Followers', id: 'tab-followers-id', component: new FollowersTab()},
				{name: 'Following', id: 'tab-following-id', component: new FollowingTab()},
				{name: 'Settings',  id: 'tab-settings-id', component: new ProfileSettings()}
			],
			currentTab: null,
			currentTabName: currentTabName,
			user: null
		};
		super(template, initialState);
		this.state = initialState;
	}

	onRender() {
		this.state.tabs.forEach(tab => {
			if (tab.name === this.state.currentTabName) {
				this.state.currentTab = tab.component;
				this.state.currentTab.render('tabs-content');
			}

			const tabBtn = document.getElementById(tab.id);
			if (!tabBtn) {return;}
			tabBtn.addEventListener('click', () => {
				if (this.state.currentTab) {
					this.state.currentTab.hide();
				}
				this.state.currentTab = tab.component;
				this.state.currentTabName = tab.name;
				this.state.currentTab.render('tabs-content');
				this.update(this.state);
			});
		});
	}

	onDestroy() {
		this.state.tabs.forEach(tab => {
			tab.component.onDestroy();
		});
	}
}

export default ProfileTabs;
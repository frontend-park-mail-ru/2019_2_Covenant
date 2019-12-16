import BaseComponent from '../../common/BaseComponent/BaseComponent';
import template from './ProfileTabs.pug';

class ProfileTabs extends BaseComponent {
	constructor(currentTabName, tabs) {
		const initialState = {
			tabs: tabs,
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
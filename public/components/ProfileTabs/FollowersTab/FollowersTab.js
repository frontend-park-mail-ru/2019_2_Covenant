import PeopleList from '../PeopleList/PeopleList';

class FollowersTab extends PeopleList {
	constructor({eventName = '', loadItems = () => {}} = {}) {
		super({
			loadItems: loadItems,
			itemsName: 'followers',
			eventName: eventName
		});
	}

}

export default FollowersTab;
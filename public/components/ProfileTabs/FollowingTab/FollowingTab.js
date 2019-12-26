import PeopleList from '../PeopleList/PeopleList';

class FollowingTag extends PeopleList {
	constructor({eventName = '', loadItems = () => {}} = {}) {
		super({
			loadItems: loadItems,
			itemsName: 'following',
			eventName: eventName
		});
	}

}

export default FollowingTag;
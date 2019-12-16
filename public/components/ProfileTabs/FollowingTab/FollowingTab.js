import SubscriptionModel from '../../../models/SubscriptionModel';
import PeopleList from '../PeopleList/PeopleList';

class FollowingTag extends PeopleList {
	constructor() {
		super({
			loadItems: () => {return SubscriptionModel.getSubscriptions(20, 0);},
			itemsName: 'following'
		});
	}

}

export default FollowingTag;
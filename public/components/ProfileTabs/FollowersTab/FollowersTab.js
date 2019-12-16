import SubscriptionModel from '../../../models/SubscriptionModel';
import PeopleList from '../PeopleList/PeopleList';

class FollowersTab extends PeopleList {
	constructor() {
		super({
			loadItems: () => {return SubscriptionModel.getSubscriptions(20, 0);},
			itemsName: 'followers'
		});
	}

}

export default FollowersTab;
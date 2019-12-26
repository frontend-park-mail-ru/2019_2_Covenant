import Http from '../services/Http';

class SubscriptionModel {
	subscribe(id) {
		return Http.fetchPost({
			path: '/subscriptions',
			body: JSON.stringify({subscription_id: id})
		})
		.then(response => response.json());
	}

	unsubscribe(id) {
		return Http.fetchDelete({
			path: '/subscriptions',
			body: JSON.stringify({subscription_id: id})
		})
		.then(response => response.json());
	}

	getSubscriptions(count, offset) {
		return Http.fetchGet({
			path: `/subscriptions?count=${count}&offset=${offset}`,
		})
		.then(response => response.json());
	}
}

export default new SubscriptionModel();
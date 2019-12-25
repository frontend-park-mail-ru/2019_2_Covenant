import EventBus from '../../../services/EventBus.js';
import Events from '../../../services/Events.js';

class Link {
	constructor({elementId= '', eventType = 'click', route = '/'} = {}) {
		this.element = document.getElementById(elementId);
		this.route = route;

		this.handler = this.handler.bind(this);
		if (this.element) {
			this.element.addEventListener(eventType, this.handler);
			return;
		}
		console.log(`link for ${elementId} to ${route} NOT FOUND`);
	}

	handler() {
		const path = this.route;
		EventBus.publish(Events.ChangeRoute, { newUrl:  path});
	}
}

export default Link;

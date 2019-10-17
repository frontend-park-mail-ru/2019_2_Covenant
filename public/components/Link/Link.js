import EventBus from '../../services/EventBus.js';
import Events from '../../services/Events.js';
import Urls from '../../services/Urls';

const eventBus = new EventBus();

class Link {
	constructor(elementId, eventType, route) {
		this.element = document.getElementById(elementId);
		this.route = route;

		this.handler = this.handler.bind(this);
		if (this.element)
			this.element.addEventListener(eventType, this.handler);
	}

	handler() {
		const path = this.route;
		const check = Object.keys(Urls).find(key => Urls[key] === path);
		if (check)
			eventBus.publish(Events.ChangeRoute, { newUrl:  path});
		else
			throw new Error('Unknown route in Link');
	}
}

export default Link;

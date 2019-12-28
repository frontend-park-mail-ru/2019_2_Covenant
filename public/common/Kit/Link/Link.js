import EventBus from '../../../services/EventBus.js';
import Events from '../../../services/Events.js';

class Link {
	constructor({elementId= '', eventType = 'click', route = '/'} = {}) {
		this.element = document.getElementById(elementId);
		this.route = route;

		this.handler = this.handler.bind(this);
		if (this.element) {
			this.element.addEventListener(eventType, this.handler);
		}
	}

	handler(event) {
		event.preventDefault();
		const path = this.route;
		EventBus.publish(Events.ChangeRoute, { newUrl:  path});
	}
}

export default Link;

export class Unlink {
	constructor({elementId= '', eventType = 'click', route = '/'} = {}) {
		this.element = document.getElementById(elementId);
		this.route = route;

		this.handler = this.handler.bind(this);
		if (this.element) {
			this.element.removeEventListener(eventType, this.handler);
		}
	}

	handler() {
		const path = this.route;
		EventBus.publish(Events.ChangeRoute, { newUrl:  path});
	}
}

import BaseComponent from '../../../BaseComponent/BaseComponent';
import template from './ArtistEditor.pug';
import Urls from '../../../../services/Urls';
import EventBus from '../../../../services/EventBus';
import Events from '../../../../services/Events';

class ArtistEditor extends BaseComponent {
	constructor() {
		super(template);

		this.path = Urls.AdminArtistEditor;
		this.backPath = Urls.AdminArtists;
	}

	loadItem() {
		const pattern = new RegExp('^' + this.path.replace(/:\w+/, '(\\w+)') + '$');
		const url = window.location.pathname;
		const params = url.match(pattern);
		const id = params[1];

		if (id > 0) {
			// need request
			return {};
		}

		return {
			id: -1,
			name: '',
			file: ''
		};
	}

	onRender() {
		this.item = this.loadItem();

		this.addCancelHandler();
	}

	addCancelHandler() {
		const btn = document.getElementById('cancel-btn');
		btn.addEventListener('click', () => {
			EventBus.publish(Events.ChangeRoute, {newUrl: this.backPath});
		});
	}
}

export default ArtistEditor;
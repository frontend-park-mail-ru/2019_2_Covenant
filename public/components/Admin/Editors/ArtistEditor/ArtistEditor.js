import BaseComponent from '../../../BaseComponent/BaseComponent';
import template from './ArtistEditor.pug';
import Urls from '../../../../services/Urls';
import EventBus from '../../../../services/EventBus';
import Events from '../../../../services/Events';
import ArtistModel from '../../../../models/ArtistModel';
import Input from '../../../Input/Input';

class ArtistEditor extends BaseComponent {
	constructor() {
		super(template);

		this.path = Urls.AdminArtistEditor;
		this.backPath = Urls.AdminArtists;

		this.saveHandler = this.saveHandler.bind(this);
		this.cancelHandler = this.cancelHandler.bind(this);
	}

	loadItem() {
		const pattern = new RegExp('^' + this.path.replace(/:\w+/, '(-?\\d+)') + '$');
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

		this.nameInput = new Input({
			inputId: 'artist-name-input'
		});

		this.addSaveHandler();
		this.addCancelHandler();
	}

	addSaveHandler() {
		const btn = document.getElementById('save-btn');
		btn.addEventListener('click', this.saveHandler);
	}

	addCancelHandler() {
		const btn = document.getElementById('cancel-btn');
		btn.addEventListener('click', this.cancelHandler);
	}

	saveHandler() {
		ArtistModel.createArtist(this.nameInput.value)
		.then(response => {
			console.log(response);
			EventBus.publish(Events.ChangeRoute, {newUrl: this.backPath});
		})
		.catch(error => {
			console.log(error);
		});
	}

	cancelHandler() {
		EventBus.publish(Events.ChangeRoute, {newUrl: this.backPath});
	}
}

export default ArtistEditor;
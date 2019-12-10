import BaseComponent from '../../../BaseComponent/BaseComponent';
import template from './PlaylistPopup.pug';
import Input from '../../../Input/Input';
import PlaylistModel from '../../../../models/PlaylistModel';
import EventBus from '../../../../services/EventBus';
import Events from '../../../../services/Events';

class PlaylistPopup extends  BaseComponent {
	constructor() {
		super(template);

		this.saveHandler = this.saveHandler.bind(this);
		this.closeHandler = this.closeHandler.bind(this);
	}

	onRender() {
		this.createInputs();
		this.addHandlers();
	}

	createInputs() {
		this.nameInput = new Input({
			inputId: 'popup-name-input'
		});
		this.descriptionInput = new Input({
			inputId: 'popup-description-input'
		});
	}

	addHandlers() {
		const saveBtn = document.getElementById('popup-save-btn');
		saveBtn.addEventListener('click', this.saveHandler);

		const closeBtn = document.getElementById('popup-close-btn');
		closeBtn.addEventListener('click', this.closeHandler);

		const cancelBtn = document.getElementById('popup-cancel-btn');
		cancelBtn.addEventListener('click', this.closeHandler);
	}

	checkValid() {

	}

	saveHandler() {
		PlaylistModel.createPlaylist({
			name: this.nameInput.value,
			description: this.descriptionInput.value
		})
		.then(response => {
			if (!response.error) {
				EventBus.publish(Events.UpdatePlaylists, {});
				this.hide();
			} else {
				console.log(response.error);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	closeHandler() {
		this.hide();
	}
}

export default PlaylistPopup;
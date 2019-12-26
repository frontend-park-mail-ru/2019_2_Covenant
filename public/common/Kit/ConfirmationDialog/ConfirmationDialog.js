import BaseComponent from '../../BaseComponent/BaseComponent';
import template from './ConfirmationDialog.pug';

class ConfirmationDialog extends BaseComponent {
	constructor({successCallback = () => {} } = {}) {
		super(template);

		this.successCallback = successCallback;
		this.closeHandler = this.closeHandler.bind(this);
	}

	onRender() {
		this.addHandlers();
	}

	addHandlers() {
		const saveBtn = document.getElementById('popup-save-btn');
		saveBtn.addEventListener('click', () => {
			this.successCallback();
			this.closeHandler();
		});

		const closeBtn = document.getElementById('popup-close-btn');
		closeBtn.addEventListener('click', this.closeHandler);

		const cancelBtn = document.getElementById('popup-cancel-btn');
		cancelBtn.addEventListener('click', this.closeHandler);
	}

	closeHandler() {
		this.hide();
	}
}

export default ConfirmationDialog;
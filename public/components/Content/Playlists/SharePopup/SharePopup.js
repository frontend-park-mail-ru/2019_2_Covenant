import BaseComponent from '../../../../common/BaseComponent/BaseComponent';
import template from './SharePopup.pug';
import {SERVER_ROOT} from '../../../../services/Settings';

class SharePopup extends BaseComponent {
	constructor({playlistId = ''} = {}) {
		const initialState = {
			url: `${SERVER_ROOT}/playlist/${playlistId}`
		};
		super(template, initialState);
		this.state = initialState;

		this.closeHandler = this.closeHandler.bind(this);
	}

	onRender() {
		const closeBtn = document.getElementById('popup-close-btn');
		closeBtn.addEventListener('click', this.closeHandler);

		const cancelBtn = document.getElementById('popup-cancel-btn');
		cancelBtn.addEventListener('click', this.closeHandler);
	}

	closeHandler() {
		this.hide();
	}
}

export default SharePopup;
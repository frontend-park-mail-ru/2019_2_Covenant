import BaseComponent from '../../../components/BaseComponent/BaseComponent';
import template from './File.pug';

class File extends BaseComponent {
	constructor({src = null, asButton = false, accept = '', disabled = null} = {}) {
		super(template, {src: src, asButton: asButton, accept: accept, disabled: disabled});
		this.file = null;

		this.addFileInputHandler = this.addFileInputHandler.bind(this);
		this.addUploadHandler = this.addUploadHandler.bind(this);
	}

	onRender() {
		this.addFileInputHandler();
		this.addUploadHandler();
	}

	get value() {
		return this.file;
	}

	addUploadHandler() {
		const uploader = document.getElementById('file-uploader-id');
		if (uploader) {
			uploader.addEventListener('click', () => {
				this.input.click();
			});
		}
	}

	addFileInputHandler() {
		this.input = document.getElementById('file-input-id');
		if (this.input) {
			this.input.addEventListener('change', (e) => {
				this.file = e.currentTarget.files[0];
			});
		}
	}
}

export default File;
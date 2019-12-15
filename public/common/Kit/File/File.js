import BaseComponent from '../../../components/BaseComponent/BaseComponent';
import template from './File.pug';

class File extends BaseComponent {
	constructor({
		src = null,  asButton = false,
		accept = '', disabled = null,
		onUpload = () => {} } = {}) {
		const initState = {
			src: src,
			asButton: asButton,
			accept: accept,
			disabled: disabled
		};
		super(template, initState);
		this.state = initState;

		this.addFileInputHandler = this.addFileInputHandler.bind(this);
		this.addUploadHandler = this.addUploadHandler.bind(this);
		this.onLoadEnd = this.onLoadEnd.bind(this);

		this.file = null;
		this.onUpload = onUpload;

		this.reader = new FileReader();
		this.reader.onloadend = this.onLoadEnd;
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
				this.reader.readAsDataURL(this.file);
				this.onUpload(this.file);
			});
		}
	}

	onLoadEnd() {
		this.state.src = this.reader.result;
		this.update(this.state);
	}
}

export default File;
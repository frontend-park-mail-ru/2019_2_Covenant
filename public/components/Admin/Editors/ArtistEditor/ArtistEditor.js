import Urls from '../../../../services/Urls';
import ArtistModel from '../../../../models/ArtistModel';
import Input from '../../../../common/Kit/Input/Input';
import ItemEditor from '../../../../common/Admin/ItemEditor/ItemEditor';
import template from './ArtistEditor.pug';
import {SERVER_ROOT} from '../../../../services/Settings';
import File from '../../../../common/Kit/File/File';

class ArtistEditor extends ItemEditor {
	constructor() {
		const initialValues = {
			id: -1,
			name: '',
			photo: ''
		};
		super({
			path: Urls.AdminArtistEditor,
			backPath: Urls.AdminArtists,
			title: 'Edit artist',
			item: initialValues,
			itemName: 'artist',
			template: template
		});

		this.onSave = this.onSave.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
	}

	loadItem(id) {
		return ArtistModel.getArtist(id);
	}

	onRender() {
		super.onRender();

		this.nameInput = new Input({
			inputId: 'artist-name-input'
		});

		const photo = this.state.item ? this.getFilePath() : null;
		this.photoInput = new File({src: photo, accept: '.jpeg, .jpg, .png'});
		this.photoInput.render('artist-file-container');
	}

	onUpdate() {
		return ArtistModel.updateArtist({
			id: this.state.item.id,
			name: this.nameInput.value
		});
	}

	onSave() {
		return ArtistModel.createArtist({
			name: this.nameInput.value,
			file: this.photoInput.value
		});
	}

	getFilePath() {
		let photoPath = this.state.item.photo;
		if (photoPath === '') {
			return null;
		}

		if (!photoPath.includes(SERVER_ROOT)) {
			photoPath = `${SERVER_ROOT}${photoPath}`;
		}
		return photoPath;
	}
}

export default ArtistEditor;
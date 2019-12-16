import template from './AlbumEditor.pug';
import ItemEditor from '../../../../common/Admin/ItemEditor/ItemEditor';
import Urls from '../../../../services/Urls';
import Input from '../../../../common/Kit/Input/Input';
import AlbumModel from '../../../../models/AlbumModel';
import Autocomplete from '../../../../common/Kit/Autocomplete/Autocomplete';
import SearchModel from '../../../../models/SearchModel';
import File from '../../../../common/Kit/File/File';
import {SERVER_ROOT} from '../../../../services/Settings';

class AlbumEditor extends ItemEditor {
	constructor() {
		const initialValues = {
			id: -1,
			artistId: -1,
			name: '',
			photo: ''
		};
		super({
			path: Urls.AdminAlbumEdtior,
			backPath: Urls.AdminAlbums,
			title: 'Edit album',
			item: initialValues,
			itemName: 'album',
			template: template
		});

		this.onSave = this.onSave.bind(this);
		this.onUpdate = this.onUpdate.bind(this);
	}

	loadItem(id) {
		return AlbumModel.getAlbum(id);
	}

	onRender() {
		super.onRender();

		this.artistAutocomplete = new Autocomplete({
			loadItems: this.loadArtists
		});
		this.artistAutocomplete.render('artist-autocomplete-id');

		this.nameInput = new Input({
			inputId: 'album-name-input'
		});

		this.yearInput = new Input({
			inputId: 'album-year-input'
		});

		const photo = this.state.item ? this.getFilePath() : null;
		this.photoInput = new File({src: photo, accept: '.jpeg, .jpg, .png'});
		this.photoInput.render('album-file-container');
	}

	onUpdate() {
		return AlbumModel.updateAlbum({
			id: '',
			artistId: '',
			name: '',
			year: ''
		});
	}

	onSave() {
		const artist = this.artistAutocomplete.value;

		return AlbumModel.createAlbum({
			artistId: artist.id,
			name: this.nameInput.value,
			year: this.yearInput.value,
			file: this.photoInput.value
		});
	}

	loadArtists(text) {
		return SearchModel.search(text).then(response => {
			return response.body.artists;
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

export default AlbumEditor;
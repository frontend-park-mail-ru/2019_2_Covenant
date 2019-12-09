import template from './AlbumEditor.pug';
import ItemEditor from '../../../../common/Admin/ItemEditor/ItemEditor';
import Urls from '../../../../services/Urls';
import Input from '../../../Input/Input';
import AlbumModel from '../../../../models/AlbumModel';
import Autocomplete from '../../../../common/Autocomplete/Autocomplete';
import SearchModel from '../../../../models/SearchModel';

class AlbumEditor extends ItemEditor {
	constructor() {
		const initialValues = {
			id: -1,
			artistId: -1,
			name: '',
			file: ''
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
			loadItems: this.loadArtists,
			itemsName: 'artists'
		});
		this.artistAutocomplete.render('artist-autocomplete-id');

		this.nameInput = new Input({
			inputId: 'album-name-input'
		});
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
			year: '2019-01-01'
		});
	}

	loadArtists(text) {
		return SearchModel.search(text);
	}
}

export default AlbumEditor;
import BaseComponent from '../BaseComponent/BaseComponent';
import template from './EditableField.pug';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';

class EditableField extends BaseComponent {
	constructor({onSave = {}} = () => {}) {
		let state = {
			edit: false
		};
		super(template, state);

		this.state = state;
		this.onSave = onSave;
		this.onEdit = this.onEdit.bind(this);
		this.updateUser = this.updateUser.bind(this);

		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	updateUser(user) {
		this.state.user = user;
		this.update(this.state);
	}

	onRender() {
		this.addEditHandler();
	}

	addEditHandler() {
		const editInfo = document.getElementById('edit_pencil');
		if (editInfo) {
			editInfo.addEventListener('click', this.onEdit);
		}
	}

	onEdit() {
		this.state.edit = true;
		this.update(this.state);
		this.addSaveHandler();
	}

	addSaveHandler() {
		const saveInfo = document.getElementById('save_info');
		if (saveInfo) {
			saveInfo.addEventListener('click', () => {
				const name = document.getElementById('profile__name__input').value;

				this.state.edit = false;
				this.update(this.state);

				this.onSave(name);
			});
		}
	}
}

export default EditableField;

import BaseComponent from '../../BaseComponent/BaseComponent';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';

class ItemEditor extends BaseComponent {
	constructor(props) {
		const initialState = {
			title: props.title,
			item: props.item,
		};
		super(props.template, initialState);
		this.state = initialState;

		this.path = props.path;
		this.backPath = props.backPath;
		this.itemName = props.itemName;

		this.saveHandler = this.saveHandler.bind(this);
		this.cancelHandler = this.cancelHandler.bind(this);
		this.onUpdate = this.onUpdate.bind(this);

		this.baseLoadItem();
	}

	onUpdate() {
		throw new Error('Method should be overridden.');
	}

	onSave() {
		throw new Error('Method should be overridden.');
	}

	loadItem() {
		throw new Error('Method should be overridden.');
	}

	onRender() {
		this.addSaveHandler();
		this.addCancelHandler();
	}

	baseLoadItem() {
		const pattern = new RegExp('^' + this.path.replace(/:\w+/, '(-?\\d+)') + '$');
		const url = window.location.pathname;
		const params = url.match(pattern);
		const id = params[1];

		if (id > 0) {
			this.loadItem(id)
			.then(response => {
				this.state.item = response.body[this.itemName];
				this.update(this.state);
			})
			.catch(error => {
				console.log(error);
			});
		}
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
		const handler = this.state.item.id > 0 ? this.onUpdate : this.onSave;

		handler()
			.then(response => {
				if (!response.error) {
					EventBus.publish(Events.ChangeRoute, {newUrl: this.backPath});
				}
			})
			.catch(error => {
				console.log(error);
			});
	}

	cancelHandler() {
		EventBus.publish(Events.ChangeRoute, {newUrl: this.backPath});
	}
}

export default ItemEditor;
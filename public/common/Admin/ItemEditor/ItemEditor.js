import BaseComponent from '../../../components/BaseComponent/BaseComponent';
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

		this.saveHandler = this.saveHandler.bind(this);
		this.cancelHandler = this.cancelHandler.bind(this);
	}

	onSave() {
		throw new Error('Method should be overridden.');
	}

	onRender() {
		this.item = this.loadItem();

		this.addSaveHandler();
		this.addCancelHandler();
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
		this.onSave()
			.then(response => {
				console.log(response);
				EventBus.publish(Events.ChangeRoute, {newUrl: this.backPath});
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
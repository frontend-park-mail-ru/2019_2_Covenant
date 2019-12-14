import BaseComponent from '../../../components/BaseComponent/BaseComponent';

class CardItem extends BaseComponent {
	constructor(props) {
		const initialState = {
			item: null
		};
		super(props.template, initialState);
		this.path = props.path;

		this.state = initialState;
		this.baseLoadItem();
	}

	baseLoadItem() {
		const pattern = new RegExp('^' + this.path.replace(/:\w+/, '(-?\\d+)') + '$');
		const url = window.location.pathname;
		const params = url.match(pattern);
		const id = params[1];

		if (id < 0) {
			return;
		}

		this.loadItem(id)
			.then(response => {
				if (!response.length) { return; }
				response.forEach(obj => {
					this.state.item = {
						...obj.body,
						...this.state.item
					};
				});
				this.onLoadItem();
				this.update(this.state);
			})
			.catch(error => {
				console.log(error);
			});
	}

	loadItem() {
		throw new Error('Should be overridden.');
	}

	onLoadItem() {}
}

export default CardItem;
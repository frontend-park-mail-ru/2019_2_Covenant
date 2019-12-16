import BaseComponent from '../../components/BaseComponent/BaseComponent';
import template from './Autocomplete.pug';

class Autocomplete extends BaseComponent {
	constructor({
		loadItems = () => {},
		containerClassName = 'autocomplete',
		inputClassName = 'autocomplete-input',
		propertyName = 'name',
		placeholder = 'Search',
		onLoad = () => {},
		onSelect = () => {},
		onClose = () => {} }) {
		const props = {
			containerClassName: containerClassName,
			inputClassName: inputClassName,
			placeholder: placeholder
		};

		super(template, props);

		this.currentFocus = 0;
		this.selectedObject = null;
		this.loadItems = loadItems;
		this.propertyName = propertyName;
		this.onLoad = onLoad;
		this.onSelect = onSelect;
		this.onClose = onClose;

		this.loadItems = this.loadItems.bind(this);
	}

	get value() {
		return this.selectedObject;
	}

	onRender() {
		this.createAutocomplete(document.getElementById('autocomplete-id'));

		document.addEventListener('click', (e) => {
			this.closeAllLists(e.target);
		});
	}

	createAutocomplete(inp) {
		inp.addEventListener('input', (e) => {
			const input = e.currentTarget;
			let a, b, i, val = input.value;
			this.closeAllLists();
			if (!val) {
				return false;
			}
			this.currentFocus = -1;
			a = document.createElement( 'DIV');
			a.setAttribute('id', input.id + 'autocomplete-list');
			a.setAttribute('class', 'autocomplete-items');
			input.parentNode.appendChild(a);

			this.loadItems(val)
				.then(items => {
					if (items.length > 0) {
						this.onLoad();
					}

					for (i = 0; i < items.length; i++) {
						b = document.createElement('DIV');
						const name = items[i][this.propertyName] || items[i].name, item = items[i];
						let index = name.toLowerCase().indexOf(val.toLowerCase());
						if (index < 0) {
							index = 0;
						}
						const before = name.substr(0, index), after = name.substr(index + val.length, name.length);
						b.innerHTML = `${before}<strong>${name.substr(index, val.length)}</strong>${after}`;
						b.innerHTML += `<input type='hidden' value='${items[i].name}'>`;
						b.addEventListener('click', (e) => {
							const element = e.currentTarget;
							inp.value =  element.getElementsByTagName('input')[0].value;
							this.selectedObject = item;
							this.onSelect(val);
							this.closeAllLists();
						});
						a.appendChild(b);
					}
				})
				.catch(error => {
					console.log(error);
				});
		});

		inp.addEventListener('keydown', (e) => {
			const input = e.currentTarget;

			let x = document.getElementById(input.id + 'autocomplete-list');
			if (x) x = x.getElementsByTagName('div');
			if (e.keyCode === 40) { // down
				this.currentFocus++;
				this.addActive(x);
			} else if (e.keyCode === 38) { //up
				this.currentFocus--;
				this.addActive(x);
			} else if (e.keyCode === 13) { // enter
				e.preventDefault();
				if (this.currentFocus > -1) {
					if (x) x[this.currentFocus].click();
				}
			}
		});
	}

	addActive(x) {
		if (!x) {
			return false;
		}
		this.removeActive(x);
		if (this.currentFocus >= x.length) {
			this.currentFocus = 0;
		}
		if (this.currentFocus < 0) {
			this.currentFocus = (x.length - 1);
		}
		x[this.currentFocus].classList.add('autocomplete-active');
	}

	removeActive(x) {
		for (let i = 0; i < x.length; i++) {
			x[i].classList.remove('autocomplete-active');
		}
	}

	closeAllLists(elmnt) {
		const items = document.getElementsByClassName('autocomplete-items');
		for (let i = 0; i < items.length; i++) {
			if (elmnt !== items[i]) { // && elmnt !== inp) {
				items[i].parentNode.removeChild(items[i]);
			}
		}
		this.onClose();
	}
}

export default Autocomplete;
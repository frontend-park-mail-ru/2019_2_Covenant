import BaseComponent from '../BaseComponent/BaseComponent';
import template from './Pagination.pug';

class Pagination extends BaseComponent {
	constructor({
		onChange = () => {},
		total = 10,
		count = 10 } = {}) {
		const initialState = {
			onChange: onChange,
			total: total,
			countPerPage: count,
			current: 0,
			items: []
		};
		super(template, initialState);
		this.state = initialState;
		this.prevHandler = this.prevHandler.bind(this);
		this.nextHandler = this.nextHandler.bind(this);
		this.onSelectPage = this.onSelectPage.bind(this);

		this.getPages();
	}

	onRender() {
		this.addHandlers();
	}

	onDestroy() {
		this.removeHandlers();
	}

	addHandlers() {
		const prevBtn = document.getElementById('prev-btn');
		prevBtn.addEventListener('click', this.prevHandler);

		const nextBtn = document.getElementById('next-btn');
		nextBtn.addEventListener('click', this.nextHandler);

		this.state.items.forEach(item => {
			const id = `pagination-item-${item.pageNumber}`;
			const btn = document.getElementById(id);
			if (btn) {
				btn.addEventListener('click', () => {
					this.onSelectPage(item.pageNumber);
				});
			}
		});
	}

	removeHandlers() {
		const prevBtn = document.getElementById('prev-btn');
		if (prevBtn) {
			prevBtn.removeEventListener('click', this.prevHandler);
		}

		const nextBtn = document.getElementById('next-btn');
		if (nextBtn) {
			nextBtn.removeEventListener('click', this.nextHandler);
		}

		this.state.items.forEach(item => {
			const id = `pagination-item-${item.pageNumber}`;
			const btn = document.getElementById(id);
			if (btn) {
				btn.removeEventListener('click', () => {
					this.onSelectPage(item.pageNumber);
				});
			}
		});
	}

	getPages() {
		const pages = [];

		const {total, countPerPage} = this.state;
		const countPages = total / countPerPage;
		for (let i = 0; i < countPages; i++) {
			pages.push({pageNumber: i});
		}

		this.state.items = pages;
		this.update(this.state);
	}

	prevHandler() {
		let {current} = this.state;
		current--;
		if (current < 0) {
			current = 0;
		}
		this.state.current = current;
		this.update(this.state);

		this.state.onChange(current);
	}

	nextHandler() {
		const {total, countPerPage} = this.state;
		const countPages = Math.floor(total / countPerPage);

		let {current} = this.state;
		current++;
		if (current > countPages) {
			current = countPages;
		}
		this.state.current = current;
		this.update(this.state);

		this.state.onChange(current);
	}

	onSelectPage(pageNumber) {
		this.state.current = pageNumber;
		this.update(this.state);

		this.state.onChange(this.state.current);
	}
}

export default Pagination;
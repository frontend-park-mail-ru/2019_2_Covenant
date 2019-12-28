import BaseComponent from '../../BaseComponent/BaseComponent';
import Pagination from '../../Kit/Pagination/Pagination';

class CardList extends BaseComponent {
	constructor({
		template = '', itemsName = '',
		countPerPage = 10} = {}) {
		const initState = {
			total: 0,
			items: []
		};
		super(template, initState);
		this.state = initState;

		this.countPerPage = countPerPage;
		this.itemsName = itemsName;

		this.pagination = this.initPagination();
		this.baseLoadItems(this.countPerPage);
	}

	baseLoadItems(count, offset = 0) {
		this.loadItems(count, offset)
			.then(response => {
				this.state.total = response.body.total;
				this.state.items = response.body[this.itemsName];

				this.pagination.setTotal(response.body.total);
				this.update(this.state);
			})
			.catch(error => {
				console.log(error);
			});
	}

	onRender() {
		this.pagination.onDestroy();
		this.pagination.render('pagination');
	}

	initPagination() {
		return new Pagination({
			total: 0,
			count: this.countPerPage,
			onChange: (pageNumber) => {
				this.baseLoadItems(this.countPerPage, this.countPerPage * pageNumber);
			}
		});
	}
}

export default CardList;
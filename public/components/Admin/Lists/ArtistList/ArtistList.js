import BaseComponent from '../../../BaseComponent/BaseComponent';
import template from './ArtistList.pug';
import Pagination from '../../../Pagination/Pagination';

class ArtistList extends BaseComponent {
	constructor() {
		const initialState = {
			columns: [],
			dataSource: []
		};
		super(template);
		this.getDataWithPagination = this.getDataWithPagination.bind(this);
		this.editHandler = this.editHandler.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);

		this.state = initialState;
		this.state.columns = this.getColumns();
		this.state.dataSource = this.getDataWithPagination(5, 0);
		this.pagination = this.initPagination();
		this.update(this.state);
	}

	getColumns() {
		return [
			{
				title: '#',
				dataIndex: 'id',
				className: 'list_header_num'
			},
			{
				title: 'Name',
				dataIndex: 'name',
				className: 'list_header_name'
			},
			{
				title: 'Actions',
				className: 'list_header_btn'
			}
		];
	}

	getDataWithPagination(count, offset) {
		let list = [];
		for (let i = 0; i < 11; i++){
			list.push(
				{id: 1, name: 'Imagine Dragons'},
				{id: 2, name: 'Asammuel'}
			);
		}
		let start = 0 + offset;
		let end = start + count > list.length ? list.length : start + count;
		list = list.slice(start, end);
		return list;
	}

	onRender() {
		this.pagination.onDestroy();
		this.pagination.render('pagination');

		this.addActionHandlers();
	}

	initPagination() {
		return new Pagination({
			total: 22,
			count: 5,
			onChange: (pageNumber) => {
				console.log(`current page ${pageNumber}`);
				this.state.dataSource = this.getDataWithPagination(5, 5 * pageNumber);
				this.update(this.state);
			}
		});
	}

	addActionHandlers() {
		const editBtns = document.getElementsByName('edit-btn');
		editBtns.forEach(btn => {
			btn.addEventListener('click', this.editHandler);
		});

		const delBtns = document.getElementsByName('delete-btn');
		delBtns.forEach(btn => {
			btn.addEventListener('click', this.deleteHandler);
		});
	}

	editHandler(evt) {
		console.log(evt.currentTarget.dataset);
	}

	deleteHandler(evt) {
		console.log(evt.currentTarget.dataset);
	}
}

export default ArtistList;
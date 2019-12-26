import BaseComponent from '../../BaseComponent/BaseComponent';
import Pagination from '../../Kit/Pagination/Pagination';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import template from './ItemList.pug';

class ItemList extends BaseComponent {
	constructor({
		editorPath = '',
		addCaption = '',
		title = '',
		itemsName = '',
		editBtn = true,
		deleteBtn = true
	} = {}) {
		const initialState = {
			addCaption: addCaption,
			title: title,
			editBtn: editBtn,
			deleteBtn: deleteBtn
		};
		super(template, initialState);

		this.editorPath = editorPath;
		this.countPerPage = 10;
		this.itemsName = itemsName;
		this.state = {
			...initialState,
			columns: [] ,
			dataSource: []
		};
		this.state.columns = this.getColumns();
		this.pagination = this.initPagination();
		this.baseLoadItems(this.countPerPage);

		this.editHandler = this.editHandler.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
		this.createItemHandler = this.createItemHandler.bind(this);
	}

	getColumns() {
		throw new Error('Method should be overridden.');
	}

	loadItems() {
		throw new Error('Method should be overridden.');
	}

	baseLoadItems(count, offset = 0) {
		this.loadItems(count, offset)
			.then(response => {
				this.state.dataSource.total = response.body.total;
				this.state.dataSource.items = response.body[this.itemsName];

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

		this.addActionHandlers();
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

	addActionHandlers() {
		const editBtns = document.getElementsByName('edit-btn');
		editBtns.forEach(btn => {
			btn.addEventListener('click', this.editHandler);
		});

		const delBtns = document.getElementsByName('delete-btn');
		delBtns.forEach(btn => {
			btn.addEventListener('click', this.deleteHandler);
		});

		const createBtn = document.getElementById('create-item-btn');
		if (createBtn) {
			createBtn.addEventListener('click', this.createItemHandler);
		}
	}

	editHandler(evt) {
		const id = evt.currentTarget.dataset.id;
		EventBus.publish(Events.ChangeRoute, {newUrl: this.editorPath.replace(/:\w+/, id)});
	}

	deleteHandler(evt) {
		const id = evt.currentTarget.dataset.id;
		this.deleteItem(id)
		.then(response => {
			if (!response.error) {
				const current = this.pagination.currentPage;
				this.baseLoadItems(this.countPerPage, current * this.countPerPage);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	createItemHandler() {
		const id = -1;
		EventBus.publish(Events.ChangeRoute, {newUrl: this.editorPath.replace(/:\w+/, id)});
	}

	deleteItem(id) {
		throw new Error('Delete item should be overridden.');
	}
}

export default ItemList;
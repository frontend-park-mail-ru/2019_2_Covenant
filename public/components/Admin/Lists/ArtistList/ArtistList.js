import BaseComponent from '../../../BaseComponent/BaseComponent';
import template from './ArtistList.pug';
import Pagination from '../../../Pagination/Pagination';
import EventBus from '../../../../services/EventBus';
import Events from '../../../../services/Events';
import Urls from '../../../../services/Urls';
import ArtistModel from '../../../../models/ArtistModel';

class ArtistList extends BaseComponent {
	constructor() {
		const initialState = {
			columns: [],
			dataSource: []
		};
		super(template);

		this.editorPath = Urls.AdminArtistEditor;
		this.countPerPage = 10;
		this.itemsName = 'artists';
		this.state = initialState;
		this.state.columns = this.getColumns();
		this.pagination = this.initPagination();
		this.baseLoadItems(this.countPerPage);

		this.editHandler = this.editHandler.bind(this);
		this.deleteHandler = this.deleteHandler.bind(this);
		this.createItemHandler = this.createItemHandler.bind(this);
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

	loadItems(count, offset) {
		return ArtistModel.getArtists(count, offset);
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
		console.log(evt.currentTarget.dataset);
	}

	createItemHandler() {
		const id = -1;
		EventBus.publish(Events.ChangeRoute, {newUrl: this.editorPath.replace(/:\w+/, id)});
	}
}

export default ArtistList;
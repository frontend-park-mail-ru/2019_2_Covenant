import BaseComponent from '../../../BaseComponent/BaseComponent';
import template from './ArtistList.pug';

class ArtistList extends BaseComponent {
	constructor() {
		const initialState = {
			columns: [],
			dataSource: []
		};
		super(template);

		this.state = initialState;
		this.state.columns = this.getColumns();
		this.state.dataSource = this.getData();
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

	getData() {
		let res =[];
		for (let i = 0; i < 10; i++){
			res.push(
				{id: 1, name: 'Imagine Dragons'},
				{id: 2, name: 'Asammuel'}
			);
		}
		return res;
	}

	onRender() {

	}

}

export default ArtistList;
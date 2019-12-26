import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import TrackModel from '../../../models/TrackModel';
import TrackList from '../../Lists/TrackList/TrackList';
import template from './Favourites.pug';

class FavouritesTab extends BaseComponent {
	constructor() {
		const initialState = {
			items: []
		};
		super(template, initialState);
		this.state = initialState;
		this.updateUser = this.updateUser.bind(this);

		EventBus.subscribe(Events.UpdateUser, this.updateUser);
	}

	updateUser() {
		TrackModel.favourites(10, 0)
		.then(response => {
			this.state.items = response.body.tracks;
			this.update(this.state);
		})
		.catch(error => { console.log(error); });
	}

	onRender() {
		const trackList = new TrackList({
			trackClassName: 'track-list',
			tracks: this.state.items,
			withTitle: false
		});
		trackList.render('favourites-tab-id');
	}

	onDestroy() {
		EventBus.unSubscribe(Events.UpdateUser, this.updateUser);
	}
}

export default FavouritesTab;
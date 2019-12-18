import BaseController from './BaseController';
import artistView from '../views/ArtistView/ArtistView';
import Artist from '../components/Content/Artist/Artist';
import UserModel from '../models/UserModel';
import EventBus from '../services/EventBus';
import Events from '../services/Events';

class ArtistController extends BaseController {
	constructor() {
		super(artistView);
	}

	onShow() {
		const artist = new Artist();
		artist.render('content');

		UserModel.getProfile()
		.then(response => {
			console.log(response);
			if (!response.error) {
				EventBus.publish(Events.UpdateUser, response.body.user);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}
}

export default ArtistController;
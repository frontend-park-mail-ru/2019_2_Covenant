import BaseController from './BaseController';
import artistView from '../views/ArtistView/ArtistView';
import Artist from '../components/Content/Artist/Artist';
import UserModel from '../models/UserModel';
import EventBus from '../services/EventBus';
import Events from '../services/Events';
import Menu from '../components/Menu/Menu';
import Player from '../components/Player/Player';

class ArtistController extends BaseController {
	constructor() {
		super(artistView);
	}

	onShow() {
		const menu = new Menu();
		menu.render('menu');

		this.player = Player.getInstance();
		this.player.render('player-id');

		const artist = new Artist();
		artist.render('content');

		UserModel.getProfile()
		.then(response => {
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
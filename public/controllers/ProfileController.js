import UserModel from '../models/UserModel';
import Events from '../services/Events';
import EventBus from '../services/EventBus';
import BaseController from './BaseController';
import Urls from '../services/Urls';
import NewHeader from '../components/NewHeader/NewHeader';
import Menu from '../components/Menu/Menu';
import Profile from '../components/Profile/Profile';
import ProfileSettings from '../components/ProfileSettings/ProfileSettings';
import Player from '../components/Player/Player';

class ProfileController extends BaseController {
	constructor(view) {
		super(view);
	}

	onShow() {
		UserModel.getProfile()
		.then(response => {
			if (response.error) {
				EventBus.publish(Events.ChangeRoute, {newUrl: Urls.LoginUrl});
			} else {
				const header = new NewHeader();
				header.render('header');

				const menu = new Menu();
				menu.render('menu');

				const player = new Player();
				player.render('player-id');

				const profile = new Profile();
				profile.render('user-info');

				const settings = new ProfileSettings();
				settings.render('user-tabs');

				EventBus.publish(Events.UpdateUser, response.body.user);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}
}

export default ProfileController;

import UserModel from '../models/UserModel';
import Events from '../services/Events';
import EventBus from '../services/EventBus';
import BaseController from './BaseController';
import Urls from '../services/Urls';
import NewHeader from '../components/NewHeader/NewHeader';
import Menu from '../components/Menu/Menu';
import Profile from '../components/Profile/Profile';
import ProfileSettings from '../components/ProfileSettings/ProfileSettings';

class ProfileController extends BaseController {
	constructor(view) {
		super(view);

		this.page = {
			user: null
		};

		this.onSave = this.onSave.bind(this);
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

	onSave(fieldValue) {
		const name = fieldValue;
		if(!name || name === '')
			return;

		UserModel.updateProfile(name)
		.then(response => {
			if (!response.error) {
				this.page.user = response.body;
				EventBus.publish(Events.UpdateUser, response.body.user);
			}
		}).catch(error => {
			console.log(error);
		});
	}
}

export default ProfileController;

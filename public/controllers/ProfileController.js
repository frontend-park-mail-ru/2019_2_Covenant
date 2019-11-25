import UserModel from '../models/UserModel';
import Events from '../services/Events';
import EventBus from '../services/EventBus';
import Avatar from '../components/Avatar/Avatar';
import EditableField from '../components/EditableField/EditableField';
import BaseController from './BaseController';
import Header from '../components/Header/Header';
import Urls from '../services/Urls';
import TrackList from '../components/TrackList/TrackList';
import TrackModel from '../models/TrackModel';
import NewHeader from '../components/NewHeader/NewHeader';
import Menu from '../components/Menu/Menu';
import Profile from '../components/Profile/Profile';
import ProfileSettings from '../components/ProfileSettings/ProfileSettings';

class ProfileController extends BaseController {
	constructor(view) {
		super(view);
		this.title = 'Profile Page';

		this.page = {
			user: null
		};

		this.onSave = this.onSave.bind(this);
		this.onUploadAvatar = this.onUploadAvatar.bind(this);
	}

	// onShow() {
	// 	UserModel.getProfile().then(response =>
	// 	{
	// 		if (response.error) {
	// 			EventBus.publish(Events.ChangeRoute, Urls.LoginUrl);
	// 		} else {
	// 			this.mountHeader();
	// 			this.mountAvatar();
	// 			this.mountEditableName();
	// 			this.mountTracks();
	//
	// 			EventBus.publish(Events.UpdateUser, response.body);
	//
	// 			console.log(response);
	// 		}
	// 	})
	// 	.catch(error => {
	// 		console.log(error);
	// 	});
	// }

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

				EventBus.publish(Events.UpdateUser, response.body);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	mountAvatar() {
		const avatar = new Avatar({
			width: 120,
			height: 120,
			accept: '.jpg, .jpeg, .png',
			onUpload: this.onUploadAvatar
		});
		avatar.render('avatar');
	}

	mountEditableName() {
		const editableField = new EditableField({
			onSave: this.onSave
		});
		editableField.render('info-user');
	}

	mountTracks() {
		TrackModel.favourites()
		.then(response => {
			if (!response.error) {
				const tracks = response.body;

				const trackList = new TrackList({
					containerClasssName: 'track-list-container__left',
					title: 'My favourites',
					tracks: tracks
				});
				trackList.render('profile__tracks');

			} else {
				console.log(response.error);
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
				EventBus.publish(Events.UpdateUser, response.body);
			}
		}).catch(error => {
			console.log(error);
		});
	}

	onUploadAvatar(file) {
		UserModel.uploadAvatar(file)
		.then(response => {
			this.page.user = response.body;
			EventBus.publish(Events.UpdateUser, this.page.user);
		}).catch(error => {
			console.log(error);
		});
	}
}

export default ProfileController;

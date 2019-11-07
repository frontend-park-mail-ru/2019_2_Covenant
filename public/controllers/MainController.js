import BaseController from './BaseController';
import UserModel from "../models/UserModel";
import Header from "../components/Header/Header";
import EventBusModule from '../services/EventBus';
import Events from '../services/Events';
import TrackList from "../components/TrackList/TrackList";

const EventBus = new EventBusModule();

class MainController extends BaseController {
	constructor(view){
		super(view);

		this.title = 'Main Page';
	}

	onShow() {
		const header = new Header();
		header.render('header');

		const trackList = new TrackList();
		trackList.render('container');

		UserModel.getProfile().then(response =>
		{
			if (response.error) {

			} else {
				console.log(response.body);
				EventBus.publish(Events.UpdateUser, response.body);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}
}

export default MainController;

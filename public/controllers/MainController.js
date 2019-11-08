import BaseController from './BaseController';
import UserModel from "../models/UserModel";
import Header from "../components/Header/Header";
import EventBusModule from '../services/EventBus';
import Events from '../services/Events';
import TrackList from "../components/TrackList/TrackList";
import TrackModel from "../models/TrackModel";

const EventBus = new EventBusModule();

class MainController extends BaseController {
	constructor(view){
		super(view);

		this.title = 'Main Page';
	}

	onShow() {

		UserModel.getProfile().then(response =>
		{
			this.mountHeader();
			this.mountTrackList();

			if (!response.error) {
				EventBus.publish(Events.UpdateUser, response.body);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}

	mountHeader() {
		const header = new Header();
		header.render('header');
	}

	mountTrackList() {
		TrackModel.popular()
		.then(response => {
			if (!response.error) {
				const tracks = response.body;

				const trackList = new TrackList({
					containerClasssName: 'track-list-container',
					title: 'Popular Tracks',
					tracks: tracks
				});
				trackList.render('container');

			} else {
				console.log(response.error);
			}
		})
		.catch(error => {
			console.log(error);
		});
	}
}

export default MainController;

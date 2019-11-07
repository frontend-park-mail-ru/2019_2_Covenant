import BaseController from './BaseController';
import UserModel from "../models/UserModel";
import Header from "../components/Header/Header";
import EventBusModule from '../services/EventBus';
import Events from '../services/Events';

const EventBus = new EventBusModule();

class MainController extends BaseController {
	constructor(view){
		super(view);

		this.title = 'Main Page';
	}

	onShow() {
		UserModel.getProfile().then(response =>
		{
			const header = new Header();
			header.render('header');

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

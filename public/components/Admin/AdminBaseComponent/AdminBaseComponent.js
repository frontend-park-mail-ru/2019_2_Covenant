import UserModel, {UserRole} from '../../../models/UserModel';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import Urls from '../../../services/Urls';
import BaseComponent from '../../BaseComponent/BaseComponent';

class AdminBaseComponent extends BaseComponent {
	constructor(template) {
		super(template);

		this.renderCallback = this.renderCallback.bind(this);
	}

	onRender() {
		UserModel.getProfile()
		.then(response => {
			if (response.error) {
				console.log(response.error);
				EventBus.publish(Events.ChangeRoute, { newUrl: Urls.MainUrl });
				return;
			}

			const user = response.body;
			if (user.role !== UserRole.Admin || user.nickname !== 'krulex98@mail.ru') {
				EventBus.publish(Events.ChangeRoute, { newUrl: Urls.MainUrl });
				return;
			}

			this.renderCallback();
		})
		.catch(error => {
			console.log(error);
		});
	}

	renderCallback() {
		throw Error('Render not implemented from AdminBaseComponent.');
	}
}

export default AdminBaseComponent;



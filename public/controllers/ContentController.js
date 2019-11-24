import BaseController from './BaseController';
import Menu from '../components/Menu/Menu';
import NewHeader from '../components/NewHeader/NewHeader';
import UserModel from '../models/UserModel';
import EventBus from '../services/EventBus';
import Events from '../services/Events';

class ContentController extends BaseController {
    constructor(view) {
        super(view);
    }

    onShow() {

        const header = new NewHeader();
        header.render('header');

        const menu = new Menu();
        menu.render('menu');

        UserModel.getProfile()
        .then(response => {
            console.log(response);
            if (!response.error) {
                EventBus.publish(Events.UpdateUser, response.body);
            }
        })
        .catch(error => {
            console.log(error);
        });

    }

    renderContent() {

    }
}

export default ContentController;
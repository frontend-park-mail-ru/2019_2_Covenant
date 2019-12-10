import BaseController from './BaseController';
import Menu from '../components/Menu/Menu';
import NewHeader from '../components/NewHeader/NewHeader';
import UserModel from '../models/UserModel';
import EventBus from '../services/EventBus';
import Events from '../services/Events';
import homeView from '../views/HomeView/HomeView';
import Playlists from '../components/Content/Playlists/Playlists';

class ContentController extends BaseController {
    constructor(component) {
        super(homeView);

        this.component = component;
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
                EventBus.publish(Events.UpdateUser, response.body.user);

                const content = new this.component();
                content.render('content');
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export class PlayListsController extends ContentController {
    constructor() {
        super(Playlists);
    }
}

export default ContentController;
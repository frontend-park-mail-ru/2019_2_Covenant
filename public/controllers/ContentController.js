import BaseController from './BaseController';
import Menu from '../components/Menu/Menu';
import NewHeader from '../components/NewHeader/NewHeader';
import UserModel from '../models/UserModel';
import EventBus from '../services/EventBus';
import Events from '../services/Events';
import homeView from '../views/HomeView/HomeView';
import Playlists from '../components/Content/Playlists/Playlists';
import Home from '../components/Content/Home/Home';
import Collections from '../components/Content/Collections/Collections';
import Albums from '../components/Content/Albums/Albums';
import Artists from '../components/Content/Artists/Artists';
import Search from '../components/Content/Search/Search';
import Favourites from '../components/Content/Favourites/Favourites';
import Followers from '../components/Content/Followers/Followers';
import Following from '../components/Content/Following/Following';
import Player from '../components/Player/Player';

export default class ContentController extends BaseController {
    constructor(component) {
        super(homeView);

        this.component = component;
    }

    onShow() {
        const header = new NewHeader();
        header.render('header');

        const menu = new Menu();
        menu.render('menu');

        const content = new this.component();
        content.render('content');

        const player = new Player();
        player.render('player-id');

        UserModel.getProfile()
        .then(response => {
            console.log(response);
            if (!response.error) {
                EventBus.publish(Events.UpdateUser, response.body.user);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }
}

export class HomeController extends ContentController {
    constructor() {
        super(Home);
    }
}

export class CollectionsController extends ContentController {
    constructor() {
        super(Collections);
    }
}

export class AlbumsController extends ContentController {
    constructor() {
        super(Albums);
    }
}

export class ArtistsController extends ContentController {
    constructor() {
        super(Artists);
    }
}

export class SearchController extends ContentController {
    constructor() {
        super(Search);
    }
}

export class PlayListsController extends ContentController {
    constructor() {
        super(Playlists);
    }
}

export class FavouriteController extends ContentController {
    constructor() {
        super(Favourites);
    }
}

export class FollowersController extends ContentController {
    constructor() {
        super(Followers);
    }
}

export class FollowingController extends ContentController {
    constructor() {
        super(Following);
    }
}
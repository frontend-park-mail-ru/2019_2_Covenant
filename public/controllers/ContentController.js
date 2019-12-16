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
import Artists from '../components/Content/Artists/Artists';
import Search from '../components/Content/Search/Search';
import Player from '../components/Player/Player';
import Album from '../components/Content/Album/Album';
import Playlist from '../components/Content/Playlist/Playlist';
import AlbumList from '../components/Lists/AlbumList/AlbumList';
import Urls from '../services/Urls';

export default class ContentController extends BaseController {
    constructor(component, withRedirect = false) {
        super(homeView);

        this.component = component;
        this.withRedirect = withRedirect;
    }

    onShow() {
        const header = new NewHeader();
        header.render('header');

        const menu = new Menu();
        menu.render('menu');

        this.player = Player.getInstance();
        this.player.render('player-id');

        this.content = new this.component();
        this.content.render('content');

        UserModel.getProfile()
        .then(response => {
            console.log(response);
            if (!response.error) {
                EventBus.publish(Events.UpdateUser, response.body.user);
                return;
            }
            if (this.withRedirect) {
                EventBus.publish(Events.ChangeRoute, {newUrl: Urls.LoginUrl});
            }

        })
        .catch(error => {
            console.log(error);
        });
    }

    onHide() {
        this.content.onDestroy();
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
        super(AlbumList);
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

export class AlbumController extends ContentController {
    constructor() {
        super(Album);
    }
}

export class PlaylistController extends ContentController {
    constructor() {
        super(Playlist, true);
    }
}
import BaseController from './BaseController';
import Menu from '../components/Menu/Menu';

class ContentController extends BaseController {
    constructor(view) {
        super(view);
    }

    onShow() {
        const menu = new Menu();
        menu.render('wrapper');
        // menu
        // header
        // content: albumList,

    }
}

export default ContentController;
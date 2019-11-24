import BaseController from './BaseController';
import Menu from '../components/Menu/Menu';
import NewHeader from '../components/NewHeader/NewHeader';

class ContentController extends BaseController {
    constructor(view) {
        super(view);
    }

    onShow() {

        const header = new NewHeader();
        header.render('header');

        const menu = new Menu();
        menu.render('menu');

    }

    renderContent() {

    }
}

export default ContentController;
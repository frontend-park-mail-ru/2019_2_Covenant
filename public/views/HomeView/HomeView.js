import templateFunc from './HomeView.pug';
import BaseView from '../../common/BaseView/BaseView.js';

const homeView = new BaseView(
    document.body,
    templateFunc
);

export default homeView;

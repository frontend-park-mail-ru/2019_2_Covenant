import Application from 'base/application/Application';
import Node from 'components/Node';
import Header from 'components/Header/Header';

const app = Application.instance;

const node = new Header();
Object.defineProperty(window, 'node', {value: node});
Object.defineProperty(window, 'app', {value: app});
Object.defineProperty(window, 'Application', {value: Application});

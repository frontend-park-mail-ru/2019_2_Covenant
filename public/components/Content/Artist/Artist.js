import BaseComponent from '../../../common/BaseComponent/BaseComponent';
import template from './Artist.pug';
import EventBus from '../../../services/EventBus';
import Events from '../../../services/Events';
import Urls from '../../../services/Urls';
import ArtistModel from '../../../models/ArtistModel';
import {formatServerRoot} from '../../../services/Utils';
import NewHeader from '../../NewHeader/NewHeader';
import Menu from '../../Menu/Menu';
import Player from '../../Player/Player';

class Artist extends BaseComponent {
	constructor() {
		const initState = {
			artist: null
		};
		super(template, initState);
		this.state = initState;
		this.path = Urls.ArtistUrl;

		this.loadItem();
	}

	onRender() {
		this.renderContent();
	}

	loadItem() {
		const pattern = new RegExp('^' + this.path.replace(/:\w+/, '(-?\\d+)') + '$');
		const url = window.location.pathname;
		const params = url.match(pattern);
		const id = params[1];

		if (id < 0) {
			EventBus.publish(Events.ChangeRoute, {newUrl: Urls.MainUrl});
			return;
		}

		ArtistModel.getArtist(id)
			.then(response => {
				if (response.error) {
					console.log(response.error);
					return;
				}
				this.state.artist = response.body.artist;
				formatServerRoot(this.state.artist, 'photo');
				this.update(this.state);
			})
			.catch(error => {console.log(error);});

	}

	renderContent() {
		const header = new NewHeader({
			headerPositionClass: 'header__align-top'
		});
		header.render('header');

		const menu = new Menu();
		menu.render('menu');

		this.player = Player.getInstance();
		this.player.render('player-id');
	}

}

export default Artist;
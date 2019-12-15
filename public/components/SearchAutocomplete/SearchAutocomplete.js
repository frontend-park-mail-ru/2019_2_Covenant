import BaseComponent from '../BaseComponent/BaseComponent';
import template from './SearchAutocomplete.pug';
import Autocomplete from '../../common/Autocomplete/Autocomplete';
import SearchModel from '../../models/SearchModel';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import Urls from '../../services/Urls';

class SearchAutocomplete extends BaseComponent {
	constructor() {
		super(template);

		this.onSelectSearch = this.onSelectSearch.bind(this);
	}

	onRender() {
		this.searchAutocomplete = new Autocomplete({
			loadItems: this.loadItems,
			propertyName: 'nickname',
			containerClassName: 'search__input-autocomplete',
			inputClassName: 'search__input-container',
			placeholder: 'Search track, artist, album or @user',
			onLoad: this.onLoadSearch,
			onSelect: this.onSelectSearch,
			onClose: this.onCloseSearch
		});
		this.searchAutocomplete.render('search-autocomplete-id');
	}

	loadItems(text) {
		return SearchModel.search(text)
			.then(response => {
				let items = [];

				if (response.error) {
					return items;
				}

				if (response.body.artists) {
					items.push(...response.body.artists.slice(0,3));
				}

				if (response.body.tracks) {
					items.push(...response.body.tracks.slice(0,3 ));
				}

				if (response.body.albums) {
					items.push(...response.body.albums.slice(0,3));
				}

				if (response.body.user) {
					items.push(...response.body.user);
				}

				return items;
			});
	}

	onLoadSearch() {
		const search = document.getElementsByClassName('search')[0];
		if (search) {
			search.style = 'border-radius: 20px 20px 0 0;';
		}
	}

	onCloseSearch() {
		const search = document.getElementsByClassName('search')[0];
		if (search) {
			search.style = 'border-radius: 40px;';
		}
	}

	onSelectSearch(text) {
		if (text !== '') {
			const userSearchRegExp = new RegExp('^@(\\w+)$');
			const match = text.match(userSearchRegExp);

			if (!match) {
				EventBus.publish(Events.ChangeRoute, {newUrl: `/search?s=${text}`});
				return;
			}

			const selectedUser = this.searchAutocomplete.value;
			EventBus.publish(Events.ChangeRoute, {newUrl: `${Urls.ProfileUrl}/${selectedUser.nickname}?tab=playlists`});
		}
	}
}

export default SearchAutocomplete;


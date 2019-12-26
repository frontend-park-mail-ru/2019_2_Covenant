import BaseComponent from '../../common/BaseComponent/BaseComponent';
import template from './SearchAutocomplete.pug';
import Autocomplete from '../../common/Kit/Autocomplete/Autocomplete';
import SearchModel from '../../models/SearchModel';
import EventBus from '../../services/EventBus';
import Events from '../../services/Events';
import Urls from '../../services/Urls';

class SearchAutocomplete extends BaseComponent {
	constructor() {
		super(template);

		this.onSelectSearch = this.onSelectSearch.bind(this);
	}

	getUrlParam() {
		const pattern = new RegExp('^'+ Urls.SearchUrl + '(\\?s=?(\\w+))?$');
		const url = `${window.location.pathname}${window.location.search}`;
		const params = url.match(pattern);
		return params ? (params[2] ? params[2] : '') : '';
	}

	onRender() {
		this.searchAutocomplete = new Autocomplete({
			value: this.getUrlParam(),
			loadItems: this.loadItems,
			getItemName: this.getItemName,
			containerClassName: 'search__input-autocomplete',
			inputClassName: 'search__input-container',
			placeholder: 'Search track, artist, album or @user',
			onLoad: this.onLoadSearch,
			onSelect: this.onSelectSearch,
			onClose: this.onCloseSearch
		});
		this.searchAutocomplete.render('search-autocomplete-id');
	}

	getItemName(item) {
		let result = '';
		if (item.name) {
			result += ` ${item.name}`;
		}

		if (item.artist) {
			result += ` (${item.artist})`;
		}

		if (item.album) {
			result += ` ${item.album}`;
		}

		if (item.nickname) {
			result += item.nickname;
		}

		return result;
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


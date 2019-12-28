import {SERVER_ROOT} from './Settings';
import Urls from './Urls';

export const formatServerRootForArray = (items, property) => {
	items.forEach(item => {
		formatServerRoot(item, property);
	});
};

export const formatServerRoot = (item, property) => {
	if (item && item[property]  && !item[property].includes(SERVER_ROOT)) {
		item[property] = `${SERVER_ROOT}${item[property]}`;
	}
};

export const formatDurationForArray = (items) => {
	items.forEach(item => {
		formatDuration(item);
	});
};

export const formatDuration = (item) => {
	if (item && item.duration) {
		const regExp = new RegExp('^\\w+:(\\d+:\\d+)Z?$');
		const res = item.duration.match(regExp);
		if (res) {
			item.duration = res[1];
		}
	}
};

export const formatYear = (item) => {
	if (item && item.year) {
		const regExp = new RegExp('^(\\d+)-\\d+-\\d+T\\d+:\\d+:\\d+Z?$');
		const res = item.year.match(regExp);
		if (res) {
			item.year = res[1];
		}
	}
};


export const getTabFromUrl = (defaultValue) => {
	const pattern = new RegExp('^' + Urls.ProfileUrl + '(\\?tab=(\\w+))?$');
	const url = `${window.location.pathname}${window.location.search}`;
	const params = url.match(pattern);
	if (!params[2]) {
		return defaultValue;
	}
	return params[2];
};

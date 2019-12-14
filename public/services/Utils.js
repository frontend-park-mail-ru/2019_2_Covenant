import {SERVER_ROOT} from './Settings';

export const formatServerRootForArray = (items) => {
	items.forEach(item => {
		formatServerRoot(item);
	});
};

export const formatServerRoot = (item) => {
	if (item.photo  && !item.photo.includes(SERVER_ROOT)) {
		item.photo = `${SERVER_ROOT}${item.photo}`;
	}
};

export const formatDurationForArray = (items) => {
	items.forEach(item => {
		formatDuration(item);
	});
};

export const formatDuration = (item) => {
	if (item.duration) {
		const regExp = new RegExp('^\\w+:(\\d+:\\d+)Z?$');
		const res = item.duration.match(regExp);
		if (res) {
			item.duration = res[1];
		}
	}
};

export const formatYear = (item) => {
	if (item.year) {
		const regExp = new RegExp('^(\\d+)-\\d+-\\d+T\\d+:\\d+:\\d+Z?$');
		const res = item.year.match(regExp);
		if (res) {
			item.year = res[1];
		}
	}
};
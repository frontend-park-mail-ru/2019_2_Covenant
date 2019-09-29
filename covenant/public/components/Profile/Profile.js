'use strict';

export default function render() {
	return `
	    <div class="header">
	        <ul class="header__list">
	            <li class="header__list_home">
	                <a href="#" class="header__list_home__link">Covenant</a>
	            </li>
	            <li class="header__list_avatar">
	                <a href="#" class="header__list_avatar__link">
	                    <img src="img/user.png" width="34" height="34" alt="user"/>
	                </a>
	            </li>
	            <li class="header__list_name">
	                <a href="#" class="header__list_name__link">{{name}}</a>
	            </li>
	        </ul>
	    </div>
	    <div class="container">
	        <div class="container__profile">
	            <div class="profile">
	                <div class="avatar">
	                    <img width="120" height="120" src="img/user_profile.png" alt="user_profile"/>
	                </div>
	                <div class="info">
	                    <div class="info__user">
	                        <label class="info__user__name">{{name}}</label>
	                        <div class="info__user__edit">
	                            <img src="img/edit.png" width="32" height="32" alt="edit" />
	                        </div>
	                    </div>
	                    <div class="info__buttons">
	                        <div class="info__buttons__shuffle">
	                            <button class="btn__shuffle" type="button">
	                                <img  class="btn__shuffle__img" src="img/play_dark.png" width="32" height="32" alt="play"/>
	                                <label class="btn__shuffle__label">Shuffle</label>
	                            </button>
	                        </div>
	                        <div class="info__buttons__settings">
	                            <button class="btn__settings" type="button">
	                                <img class="btn__shuffle__settings" src="img/settings_dark.png" width="32" height="32" alt="settings"/>
	                            </button>
	                        </div>
	                    </div>
	                </div>
	            </div>
	            <div class="music">
	                <ul class="tabs">
	                    <li>
	                        <input type="radio" name="tabs" id="tab-1" checked>
	                        <label class="tab__label" for="tab-1">Tracks</label>
	                        <div class="tab-content">
	                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
	                            tempor incididunt ut labore et dolore magna aliqua.
	                        </div>
	                    </li>
	                    <li>
	                        <input type="radio" name="tabs" id="tab-2">
	                        <label class="tab__label" for="tab-2">History</label>
	                        <div class="tab-content">
	                            Ut enim ad minim veniam,
	                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                            consequat.
	                        </div>
	                    </li>
	                    <li>
	                        <input type="radio" name="tabs" id="tab-3">
	                        <label class="tab__label" for="tab-3">Albums</label>
	                        <div class="tab-content">
	                            Ut enim ad minim veniam,
	                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                            consequat.
	                        </div>
	                    </li>
	                    <li>
	                        <input type="radio" name="tabs" id="tab-4">
	                        <label class="tab__label" for="tab-4">Artists</label>
	                        <div class="tab-content">
	                            Ut enim ad minim veniam,
	                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                            consequat.
	                        </div>
	                    </li>
	                    <li>
	                        <input type="radio" name="tabs" id="tab-5">
	                        <label class="tab__label" for="tab-5">Playlists</label>
	                        <div class="tab-content">
	                            Ut enim ad minim veniam,
	                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                            consequat.
	                        </div>
	                    </li>
	                    <li>
	                        <input type="radio" name="tabs" id="tab-6">
	                        <label class="tab__label" for="tab-6">Friends</label>
	                        <div class="tab-content">
	                            Ut enim ad minim veniam,
	                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
	                            consequat.
	                        </div>
	                    </li>
	                </ul>
	            </div>
	        </div>
	    </div>
	    <div class="footer">
	    </div>
	`;
};
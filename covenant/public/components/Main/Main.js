'use strict';

export default function render() {
	return `
		 <div class="header">
            <ul class="header__list">
                <li class="header__list_home">
                    <a href="#" class="header__list_home__link">Covenant</a>
                </li>
                <li class="header__list_signup">
                    <a href="#" id="signup_link" class="header__list_signup__link">Sign Up</a>
                </li>
                <li class="header__list_login">
                    <a href="#" id="login_link" class="header__list_login__link">Log In</a>
                </li>
            </ul>
        </div>
        <div class="container">
        </div>
        <div class="footer">
        </div>
	`;
}
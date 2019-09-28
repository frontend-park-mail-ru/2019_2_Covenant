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
            <form class="signup" id="signup-form">
                <h1 class="signup__title">Sign Up</h1>
                <div class="signup__email">
                    <label class="signup__email_label" for="signup__email_input">E-mail</label>
                    <input class="signup__email_input" id="signup__email_input" name="signup__email_input" type="text">
                </div>
                <div class="signup__password">
                    <label class="signup__password_label" for="signup__password_input">Password</label>
                    <input class="signup__password_input" id="signup__password_input" name="signup__password_input" type="password">
                </div>
                <div class="signup__repeat_password">
                    <label class="signup__repeat_password_label" for="signup__repeat_password_input">Repeat password</label>
                    <input class="signup__repeat_password_input" id="signup__repeat_password_input" name="signup__repeat_password_input" type="password">
                </div>
                <div class="signup__submit">
                    <button class="signup__submit_button" type="submit">Sign Up</button>
                </div>
                <div class="signup__addition">
                    <div class="signup__social_label">Or Sign up Using</div>
                    <div class="signup_social_icons">
                        <a href="#" class="fa fa-google"></a>
                        <a href="#" class="fa fa-facebook"></a>
                        <a href="#" class="fa fa-twitter"></a>
                    </div>
    
                </div>
            </form>
        </div>
        <div class="footer">
        </div>
    `;
};
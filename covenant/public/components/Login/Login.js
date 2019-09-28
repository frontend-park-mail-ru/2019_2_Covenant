'use strict';

function render() {
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
            <form class="login" id="login-form">
                <h1 class="login__title">Log In</h1>
                <div class="login__email">
                    <label class="login__email_label" for="login__email_input">E-mail</label>
                    <input class="login__email_input" id="login__email_input" name="login__email_input" type="text">
                </div>
                <div class="login__password">
                    <label class="login__password_label" for="login__password_input">Password</label>
                    <input class="login__password_input" id="login__password_input" name="login__password_input" type="password">
                </div>
                <div class="login__submit">
                    <button class="login__submit_button" type="submit">Log In</button>
                </div>
                <div class="login__addition">
                    <a class="login__forgot_password" href="#">Forgot your password?</a>
                    <a class="login__registration" href="#">Don’t have an account?</a>
                </div>
            </form>
        </div>
        <div class="footer">
        </div>
    `;
}

export default render;
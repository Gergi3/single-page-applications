import { changeView, updateNav } from "../utils.js";
import { showHome } from './home.js';
import { login } from '../api.js';

const loginSection = document.querySelector('.login');
const loginForm = loginSection.querySelector('form');

loginForm.addEventListener('submit', onSubmit);

function showLogin() {
    changeView(loginSection);
    updateNav('/login');
}

async function onSubmit(e) {
    e.preventDefault();

    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');

    try {
        loginSection.style.display = 'none';
        let user = await login(email, password);
        
        delete user.password;
        localStorage.setItem('user', JSON.stringify(user));
        
        showHome();
    } catch (err) {
        loginSection.style.display = 'block';
        if (err.message === 'Forbidden') {
            alert('Invalid email or password');
        } else {
            alert(err.message);
        }
    }
}

export {
    showLogin,
};
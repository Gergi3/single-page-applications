import { changeView, updateNav } from '../utils.js';
import { showHome } from './home.js'
import { register } from '../api.js';

const registerSection = document.querySelector('.register');
const registerForm = registerSection.querySelector('form');

registerForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();
    
    let formData = new FormData(e.currentTarget);
    let email = formData.get('email');
    let password = formData.get('password');
    let rePassword = formData.get('rePass');

    if (rePassword !== password) {
        alert('Passwords dont match!');
        return;
    }

    try {
        registerSection.style.display = 'none';
        let user = await register(email, password);
        
        delete user.password;
        localStorage.setItem('user', JSON.stringify(user));

        showHome();
    } catch (err) {
        registerSection.style.display = 'block';
        if (err.message === 'Conflict') {
            alert('User with this email already exists.');
        } else {
            alert(err.message);
        }
    }
}

function showRegister() {
    changeView(registerSection);
    updateNav('/register');
}

export {
    showRegister,
};
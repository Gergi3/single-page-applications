import { submitForm, clearForm } from '../form.js'
import { loginUrl } from '../url.js';
import { loadHome } from './home.js'
import { updateNav } from '../utils.js';

const loginSection = document.getElementById('form-login');
const loginForm = loginSection.querySelector('form');
loginForm.addEventListener('submit', submitLogin);

function showLogin() {
    loginSection.style.display = 'block';
}

function hideLogin() {
    loginSection.style.display = 'none';
}

async function submitLogin(e) {
    e.preventDefault();

    try {
        const answerPromise = await submitForm(loginForm, 'POST', loginUrl, ['email', 'password']);
        if (answerPromise.ok) {
            const answerJson = await answerPromise.json();
            localStorage.setItem('user', JSON.stringify(answerJson));

            hideLogin();
            loadHome();
            updateNav();
            clearForm(loginForm);
        } else {
            alert('Invalid username or password')
        }
    } catch (err) {
        console.error(err);
    }
    // 
}
    
export {
    showLogin,
};
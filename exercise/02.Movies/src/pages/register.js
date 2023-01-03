
import { submitForm, clearForm } from '../form.js'
import { registerUrl } from '../url.js';
import { loadHome } from './home.js'
import { updateNav } from '../utils.js';

const registerSection = document.getElementById('form-sign-up');
const registerForm = registerSection.querySelector('form');
registerForm.addEventListener('submit', submitRegister);

function showRegister() {
    registerSection.style.display = 'block';
}

function hideRegister() {
    registerSection.style.display = 'none';
}

async function submitRegister(e) {
    e.preventDefault();

    try {
        let alerts = [];
        let formData = new FormData(registerForm);
        const password = formData.get('password');
        const rePass = formData.get('repeatPassword');
        if (password !== rePass) {
            alerts.push('Passwords dont match');
        } if (password.length < 6) {
            alerts.push('Password must be at least 6 characters long');
        }
        
        if (alerts.length > 0) {
            alert(alerts.join('\n'));
            return;
        }

        const answerPromise = await submitForm(registerForm, 'POST', registerUrl, ['email', 'password']);
        if (answerPromise.ok) {
            const answerJson = await answerPromise.json();
            localStorage.setItem('user', JSON.stringify(answerJson));

            hideRegister();
            loadHome();
            updateNav();
            clearForm(registerForm);
        } else {
            alert('User is already registered');
        }
    } catch (err) {
        console.error(err);
    }
}
    
export {
    showRegister,
};
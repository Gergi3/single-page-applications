import { changeView, updateNav } from "../utils.js";
import { logout } from '../api.js';

const logoutSection = document.querySelector('.logout');

async function showLogout() {
    try {
        await logout();
    } catch (err) { 
        console.log('Logged out');
    }
    localStorage.removeItem('user');
    changeView(logoutSection);
    updateNav();
}

export {
    showLogout,
};
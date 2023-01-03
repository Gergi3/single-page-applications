import { changeView, updateNav } from '../utils.js';

const homeSection = document.querySelector('.home');

function showHome() {
    changeView(homeSection);
    updateNav('/');
}

export {
    showHome,
};
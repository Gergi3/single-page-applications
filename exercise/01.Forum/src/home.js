import { showTopics } from './topic.js';

const homeElement = document.querySelector('.homepage');

export function loadHome() {
    showTopics();
}

export function showHome() {
    homeElement.style.display = 'block';
}
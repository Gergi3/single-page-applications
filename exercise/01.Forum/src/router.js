import { loadHome, showHome } from './home.js';
import { showTopic, clearTopicContainer, clearTopicsContainer } from './topic.js';
import { showComments } from './comment.js';

export function router(path) {
    hideContent();

    if (path === '/') {
        clearTopicsContainer();
        loadHome();
        showHome();
    } else {
        clearTopicContainer();
        showTopic(path);
        showComments(path);
    }
}

const content = document.querySelectorAll('.container');
function hideContent() {
    Array.from(content)
        .forEach(x => x.style.display = 'none');
}
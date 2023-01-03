import { attachCreateTopicFormListeners, topicsElement } from './topic.js';
import { attachCreateCommentFormListeners } from './comment.js';
import { router } from './router.js';

window.addEventListener('load', () => {
    router('/');
    attachListeners();
});

function attachListeners() {
    attachCreateTopicFormListeners();
    attachCreateCommentFormListeners();

    topicsElement.addEventListener('click', changePage);

    document.querySelector('header nav a').addEventListener('click', (e) => {
        e.preventDefault();
        router('/');
    });
}

function changePage(e) {
    e.preventDefault();

    if (e.target.parentNode.tagName === 'A') {
        let id = e.target.closest('.topic-container').getAttribute('data-id');
        router(id);
    }
}

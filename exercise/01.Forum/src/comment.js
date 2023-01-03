import { commentsUrl } from "./url.js";
import { submitForm, clearForm } from "./form.js";
import { topicElement, topicContainer } from './topic.js';
import { createCommentElement } from './factory.js';

const form = topicElement.querySelector('form');
const commentButton = topicElement.querySelector('button');

export function attachCreateCommentFormListeners() {
    commentButton.addEventListener('click', (e) => {
        e.preventDefault();
        const topicId = topicElement.querySelector('.header').getAttribute('data-id');

        let successful = submitForm(form, commentsUrl, 'POST', ['username', 'text'], { _topicId: topicId, time: Date.now() });
        if (successful !== false) {
            clearForm(form);
            clearCommentsContainer();
            showComments(topicId);
        }
    });
}

export function showComments(topicId) {
    fetch(commentsUrl)
        .then(res => res.json())
        .then(comments => {
            let filteredComments = Object.values(comments).reduce((acc, c) => {
                if (c._topicId == topicId) {
                    acc.push(c);
                }
                return acc;
            }, []);

            let fragment = document.createDocumentFragment();
            filteredComments.forEach(comment => {
                let commentElement = createCommentElement(comment);
                fragment.appendChild(commentElement);
            })

            topicContainer.appendChild(fragment);
        })
        .catch(err => console.error(err));
}

function clearCommentsContainer() {
    let comments = topicContainer.querySelectorAll('.user-comment');
    Array.from(comments).forEach(x => x.remove());
}
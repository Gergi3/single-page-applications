import { topicsUrl } from "./url.js";
import { createTopicPreviewElement, createTopicElement } from "./factory.js";
import { submitForm, clearForm } from "./form.js";

// General
export const topicsElement = document.querySelector('.topic-title');

export function showTopics() {
    const fragment = document.createDocumentFragment();

    fetch(topicsUrl)
        .then(res => res.json())
        .then(topics => {
            Object.values(topics).forEach(topic => {
                let topicElement = createTopicPreviewElement(topic);
                fragment.appendChild(topicElement);
            })

            topicsElement.appendChild(fragment);
        })
        .catch(err => console.error(err));
}

export function clearTopicsContainer() {
    topicsElement.replaceChildren();
}


export const topicElement = document.querySelector('.topic');
export const topicContainer = topicElement.querySelector('.comment');
const topicTitleElement = topicElement.querySelector('.theme-name h2');

export function showTopic(id) {
    fetch(`${topicsUrl}/${id}`)
        .then(res => res.json())
        .then(topic => {
            topicTitleElement.textContent = topic.title;

            let topicElement = createTopicElement(topic);
            topicContainer.appendChild(topicElement);
        })
        .catch(err => console.error(err));

    topicElement.style.display = 'block';
}

export function clearTopicContainer() {
    topicContainer.replaceChildren();
}

// Form
const form = document.querySelector('.homepage form');
const buttons = form.querySelector('.new-topic-buttons');
const cancelButton = buttons.querySelector('button.cancel');
const postButton = buttons.querySelector('button.public');

export function attachCreateTopicFormListeners() {
    postButton.addEventListener('click', (e) => {
        e.preventDefault();

        let successful = submitForm(form, topicsUrl, 'POST', ['title', 'username', 'text'], { time: Date.now() });
        if (successful !== false) {
            clearForm(form);
            clearTopicsContainer();
            showTopics();
        }
    });

    cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        clearForm(form);
    });
}
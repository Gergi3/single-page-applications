import { moviesUrl } from '../url.js';
import { submitForm, clearForm } from '../form.js';
import { loadHome } from './home.js';
import { getUser } from '../utils.js';

const addSection = document.getElementById('add-movie');
const addForm  = addSection.querySelector('form');

function showAdd() {
    addSection.style.display = 'block';
}

function hideAdd() {
    addSection.style.display = 'none';
}

addForm.addEventListener('submit', submitAdd);

async function submitAdd(e) {
    e.preventDefault();

    try {
        const user = getUser();
        const answerPromise = await submitForm(addForm, 'POST', moviesUrl, ['title', 'description', 'img'], user.accessToken, { likes: 0 });
        if (answerPromise.ok) {
            hideAdd();
            loadHome();
            clearForm(addForm);
        }
    } catch (err) {
        console.error(err);
    }
}

export {
    showAdd,
};
import { submitForm, clearForm } from "../form.js";
import { moviesUrl } from "../url.js";
import { getUser } from '../utils.js';
import { loadHome } from './home.js';

const editSection = document.getElementById('edit-movie');
const editForm = editSection.querySelector('form');

editForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    let id = editForm.getAttribute('data-id');
    try {
        let response = await submitForm(editForm, 'PUT', `${moviesUrl}/${id}`, ['title', 'description', 'img'], getUser().accessToken);
        if (response.ok) {
            hideEdit();
            loadHome();
            clearForm(editForm);
            editForm.setAttribute('data-id', '');
        }
    } catch (err) {
        console.error(err);
    }
}

async function loadEdit(id) {
    await fillEditForm(id);
    showEdit();
}

function showEdit() {
    editSection.style.display = 'block';
}

function hideEdit() {
    editSection.style.display = 'none';
}

async function fillEditForm(id) {
    let title = editForm.querySelector('#title');
    let description = editForm.querySelector('textarea');
    let imgLink = editForm.querySelector('#imageUrl');

    try {
        let movieResponse = await fetch(`${moviesUrl}/${id}`);
        let movieJson = await movieResponse.json();

        title.value = movieJson.title;
        description.value = movieJson.description;
        imgLink.value = movieJson.img;

        editForm.setAttribute('data-id', movieJson._id);
    } catch (err) {
        console.error(err);
    }
}

export {
    loadEdit,
};
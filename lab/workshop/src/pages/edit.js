import { changeView } from "../utils.js";
import { getRecipe } from '../api.js';
import { editRecipe } from '../api.js';
import { showDetails } from "./details.js";

const editSection = document.querySelector('.edit-recipe');
const editForm = editSection.querySelector('form');
const editRecipeName = editSection.querySelector('h2 span.edit-title');

editForm.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    e.preventDefault();

    let form = e.currentTarget;
    let formData = new FormData(form);

    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData.get('ingredients').split('\n');
    let steps = formData.get('steps').split('\n');
    
    if (name === '' || img === '' || ingredients.length === 0 || steps.length === 0) {
        alert('Please fill all fields');
        return;
    }
    
    try {
        editSection.style.display = 'none';
        await editRecipe(form.dataset.id, { name, img, ingredients, steps })
        showDetails(form.dataset.id);
        form.reset();
    } catch (err) {
        editSection.style.display = 'block';
        alert(err.message);
    }
}

function showEdit(id) {
    changeView(editSection);
    fillEditForm(id);
}

export {
    showEdit,
};

async function fillEditForm(id) {
    try {
        let recipe = await getRecipe(id);
        if (recipe.code) {
            throw new Error('An error occured while trying to edit recipe. Please try again!');
        }
        editForm.dataset.id = recipe._id;
        editRecipeName.textContent = recipe.name;
        editForm.querySelectorAll('input:not([type="submit"]), textarea').forEach(x => {
            let value = recipe[x.name];
            if (Array.isArray(value)) {
                value = value.join('\n');
            }
            x.value = value;
        });
    } catch (err) {
        alert(err.message);
    }
}

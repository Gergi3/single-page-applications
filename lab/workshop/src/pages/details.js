import { getRecipe } from '../api.js';
import { changeView, updateNav } from '../utils.js';
import { createRecipeDetailedElement } from '../factory.js';
import { deleteRecipe } from '../api.js';
import { showCatalog } from './catalog.js';
import { showEdit } from './edit.js';

const detailsSection = document.querySelector('.detailed-recipe');

detailsSection.addEventListener('click', onClick)

function onClick(e) {
    let classList = [...e.target.classList]
    if (classList.includes('edit-btn')) {
        let id = e.target.closest('.descriptive').dataset.id;
        showEdit(id);
    } else if (classList.includes('delete-btn')) {
        let id = e.target.closest('.descriptive').dataset.id;
        deleteRecipe(id);
        showCatalog();
    }
}

function showDetails(id) {
    changeView(detailsSection);
    updateNav();
    detailsSection.replaceChildren();
    showDetailedRecipe(id);
}

async function showDetailedRecipe(id) {
    try {
        let recipe = await getRecipe(id);
        if (recipe) {
            let recipeElement = createRecipeDetailedElement(recipe);
            detailsSection.appendChild(recipeElement);
        } else {
            throw new Error('Invalid ID of recipe');
        }
    } catch (err) {
        alert(err.message);
    }
}

export {
    showDetails,
};

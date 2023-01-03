import { createRecipePreviewElement } from '/src/factory.js';
import { changeView, updateNav } from '../utils.js';
import { getRecipes } from '../api.js';
import { showDetails } from './details.js';

const catalogSection = document.querySelector('.catalog');

catalogSection.addEventListener('click', onRecipeClick);

function showCatalog() {
    changeView(catalogSection);
    updateNav('/catalog');
    catalogSection.replaceChildren();
    loadRecipes();
}

async function loadRecipes() {
    let fragment = document.createDocumentFragment();

    let recipes = await getRecipes();

    Object.values(recipes).forEach(recipe => {
        let recipeElement = createRecipePreviewElement(recipe);
        fragment.appendChild(recipeElement);
    })

    catalogSection.appendChild(fragment);
}

function onRecipeClick(e) {
    let recipeElement = e.target.closest('article.preview');
    if (recipeElement) {
        showDetails(recipeElement.dataset.id);
    }
}

export {
    showCatalog,
};
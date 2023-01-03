import { updateNav } from '../utils.js';
import { changeView } from '../utils.js';
import { showCatalog } from './catalog.js';
import { createRecipe } from '../api.js';

const createSection = document.querySelector('.create-recipe');
const createForm = createSection.querySelector('form');

createForm.addEventListener('submit', onSubmit);

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
        createSection.style.display = 'none';
        await createRecipe({ name, img, ingredients, steps })
        showCatalog();
        form.reset();
    } catch (err) {
        createSection.style.display = 'block';
        alert(err.message);
    }
}


function showCreate() {
    changeView(createSection);
    updateNav('/create');
}

export {
    showCreate, 
};
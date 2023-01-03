import { getUser } from "./utils.js";

export function createRecipePreviewElement(recipe) {
    let recipeElement =  
    e('article', '', { className: 'preview', 'data-owner-id': recipe._ownerId, 'data-id': recipe._id }, 
        e('div', '', { className: 'title' },
            e('h2', recipe.name, {})
        ),
        e('div', '', { className: 'small' }, 
            e('img', '', { src: recipe.img })
        )
    );

    return recipeElement;
}

export function createRecipeDetailedElement(recipe) {
    let recipeElement =  
    e('article', '', { className: 'descriptive', 'data-owner-id': recipe._ownerId, 'data-id': recipe._id },
        e('h2', recipe.name),
        e('div', '', { className: 'band' }, 
            e('div', '', { className: 'thumb' }, 
                e('img', '', { src: recipe.img })
            ),
            e('div', '', { className: 'ingredients' },
                e('h3', 'Ingredients:'),
                e('ul')
            )
        ),
        e('div', '', { className: 'description' },
            e('h3', 'Preparation:')
        )
    );

    let ingredientsElement = recipeElement.querySelector('.ingredients ul');
    recipe.ingredients.forEach(ingredient => {
        ingredientsElement.appendChild(e('li', ingredient));
    })

    let stepsElement = recipeElement.querySelector('.description');
    recipe.steps.forEach(step => {
        stepsElement.appendChild(e('p', step));
    });

    let user = getUser();
    if (user && user._id === recipe._ownerId) {
        recipeElement.appendChild(
        e('div', '', { className: 'controls' },
            e('button', '\u270E Edit', { className: 'edit-btn' }),
            e('button', '\u270E Delete', { className: 'delete-btn' }),
        ));
    }

    return recipeElement;
}

function e(type, text, attributes, ...children) {
    let el = document.createElement(type);

    type === 'input' ? el.value = text : el.textContent = text;

    Object.entries(attributes || {}).forEach(([k, v]) => {
        k === 'data-owner-id' || k === 'data-id' ? el.setAttribute(k, v) : el[k] = v
    });

    Array.from(children || []).forEach(child => el.appendChild(child));

    return el;
}
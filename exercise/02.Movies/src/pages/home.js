import { moviesUrl } from "../url.js";
import { createMovieCard } from '../factory.js';

const homeSection = document.getElementById('home-page');
const moviesSection = homeSection.querySelector('div.card-deck');

function showHome() {
    homeSection.style.display = 'block';
}

function clearMovies() {
    moviesSection.replaceChildren();
}

async function showMovies() {
    const fragment = document.createDocumentFragment();
    
    try {
        let moviesPromise = await fetch(moviesUrl);
        let moviesJson = await moviesPromise.json();
        
        Object.values(moviesJson).forEach(movie => {
            const movieElement = createMovieCard(movie);
            fragment.appendChild(movieElement);
        });

        moviesSection.appendChild(fragment);
    } catch (err) {
        console.error(err);
    }
}

function loadHome() {
    showHome();
    clearMovies();
    showMovies();
}

export {
    loadHome,
};
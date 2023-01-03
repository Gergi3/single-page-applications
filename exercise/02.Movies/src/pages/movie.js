import { moviesUrl } from "../url.js";
import { createMovie } from '../factory.js';
import { getUser } from '../utils.js';
import { loadHome } from './home.js'

const movieSection = document.getElementById('show-movie');
const movieContainer = movieSection.querySelector('.container');

function showMovie() {
    movieSection.style.display = 'block';
}

function clearMovie() {
    movieContainer.replaceChildren();
}

async function loadMovie(id) {
    try {
        clearMovie();
        showMovie();
        let moviePromise = await fetch(`${moviesUrl}/${id}`);
        let movieJson = await moviePromise.json();
        
        let movieElement = createMovie(movieJson);
        let user = getUser();

        if (user) {
            if (movieJson._ownerId === user._id) {
                movieElement.querySelector('.edit-btn').style.display = 'block';
                movieElement.querySelector('.delete-btn').style.display = 'block';
            } else {
                movieElement.querySelector('.like-btn').style.display = 'block';
            }
        }

        movieContainer.appendChild(movieElement);
    } catch (err) {
        console.error(err);
    }
}

async function deleteMovie(id) {
    let user = getUser();
    if (!user) {
        alert('Please login to delete movies');
        return;
    };

    let options = {
        method: 'DELETE',
        headers: { 'X-Authorization': `${user.accessToken}` },
    };
    try {
        await fetch(`${moviesUrl}/${id}`, options);
        loadHome();
    } catch (err) {
        console.error(err);
    }
}

function likeMovie(id) {
    
}

function editMovie(id) {
    
}

export {
    showMovie,
    loadMovie,
    deleteMovie,
    likeMovie,
    editMovie,
};
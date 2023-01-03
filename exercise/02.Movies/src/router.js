import { loadHome } from './pages/home.js';

import { showLogin } from './pages/login.js';
import { showRegister } from './pages/register.js';
import { logout } from './pages/logout.js';

import { loadMovie } from './pages/movie.js';
import { deleteMovie } from './pages/movie.js';
import { likeMovie } from './pages/movie.js'
import { showAdd } from './pages/add.js';
import { loadEdit } from './pages/edit.js';

const routes = {
    '/': loadHome,
    '/register': showRegister,
    '/login': showLogin,
    '/logout': logout,
    '/movie': loadMovie,
    '/add': showAdd,
    '/delete': deleteMovie,
    '/like': likeMovie,
    '/edit': loadEdit,
};

function router(path, id) {
    hideSections();

    const action = routes[path];
    action(id)
}

const sectionsArr = Array.from(document.querySelectorAll('section'));
function hideSections() {
    sectionsArr.forEach(x => x.style.display = 'none');
}

export {
    router,
};
import { showHome } from './pages/home.js';
import { showCatalog } from './pages/catalog.js';
import { showCreate } from './pages/create.js';
import { showLogout } from './pages/logout.js';
import { showLogin } from './pages/login.js';
import { showRegister } from './pages/register.js';
import { updateNav } from './utils.js'

document.querySelector('header .navigation').addEventListener('click', changePage)

const routes = {
    '/': showHome,
    '/catalog': showCatalog,
    '/create': showCreate,
    '/logout': showLogout,
    '/login': showLogin,
    '/register': showRegister,
};

function changePage(e) {
    e.preventDefault();
    
    if (e.target.tagName === 'A') {
        let url = new URL(e.target);
        let view = routes[url.pathname];
        
        if (typeof view === 'function') {
            view();
        }
        updateNav(url.pathname);
    }
}

updateNav();
showHome();
// [x] fix html
// [x] basic view routing (no functionality) 

// [X] auth
//     - login
//     - register
//     - logout

// [X] homepage
//     - fetch movies
//     - show movies
//     - registration movies

// [X] add 

// [ ] like
// [X] delete 
// [X] edit 

import { router } from './router.js';
import { updateNav } from './utils.js';

const container = document.getElementById('container');

window.addEventListener('load', () => {
    updateNav();
    router('/');
    container.addEventListener('click', changePage);    
});

function changePage(e) {
    let anchor = e.target.closest('a');
    if (anchor && anchor.href) {
        e.preventDefault();
        let url = new URL(anchor);
        let path = url.pathname;
        let id = undefined;
        
        let split = url.pathname.split('/');
        if (split.length === 3) {
            path = `/${split[1]}`;
            id = split[2];
        }

        router(path, id);
    }
}
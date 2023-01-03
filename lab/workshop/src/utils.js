const sections = document.querySelectorAll('section');

function getAuthToken() {
    let user = getUser();
    if (user) {
        return user.accessToken;
    }
    return null;
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

function changeView(section) {
    hideAllContent();
    section.style.display = 'block';
}

function hideAllContent() {
    sections.forEach(x => x.style.display = 'none');
}

const nav = document.querySelector('nav');
const userNav = nav.querySelector('.user-nav');
const guestNav = nav.querySelector('.guest-nav');
function updateNav(path) {
    let user = getUser();
    if (user) {
        userNav.style.display = 'inline';
        guestNav.style.display = 'none';
    } else {
        userNav.style.display = 'none';
        guestNav.style.display = 'inline';
    }

    const active = nav.querySelector('.active');
    active ? active.classList.remove('active') : null;
    if (path) {
        const anchor = nav.querySelector(`a[href$="${path}"]`);
        anchor ? anchor.classList.add('active') : null;
    }
}

export {
    getAuthToken,
    changeView,
    getUser,
    updateNav,
};
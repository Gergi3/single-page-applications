
const userNavElements = Array.from(document.querySelectorAll('.user'));
const guestNavElements = Array.from(document.querySelectorAll('.guest'));
const welcomeElement = document.querySelector('.nav-welcome');

function updateNav() {
    const user = getUser();
    if (user) {
        userNavElements.forEach(el => el.style.display = 'block');
        guestNavElements.forEach(el => el.style.display = 'none');
        welcomeElement.textContent = `Welcome, ${user.email}`
    } else {
        userNavElements.forEach(el => el.style.display = 'none');
        guestNavElements.forEach(el => el.style.display = 'block');
        welcomeElement.textContent = 'Welcome, guest'
    }
}

function getUser() {
    return JSON.parse(localStorage.getItem('user')) || null;
}

export {
    updateNav,
    getUser,
};
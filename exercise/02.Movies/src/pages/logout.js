import { showLogin } from "./login.js";
import { updateNav } from "../utils.js";

function logout() {
    localStorage.removeItem('user');
    updateNav();
    showLogin();
}

export {
    logout,
};
import { showYears } from './calendar.js';
import { showYear } from './calendar.js';
import { showMonth } from './calendar.js';

const routes = {
    years: showYears,
    year: showYear,
    month: showMonth
}

export function router(year, month) {
    hideContent();

    let path = year 
        ? (month ? 'month' : 'year') 
        : 'years';
    
    let routeChanger = routes[path];
    routeChanger(year, month);
}

const sections = document.querySelectorAll('section');
function hideContent() {
    Array.from(sections).forEach(x => x.style.display = 'none');
}
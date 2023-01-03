import { router } from './router.js';
import { parseMonthToNumber } from './calendar.js';

const body = document.querySelector('body');
const sections = document.querySelectorAll('section');

window.addEventListener('load', () => {
    body.addEventListener('click', switchPage);
    router();
})

function switchPage(e) {
    if (e.target.tagName === 'SECTION') {
        return;
    }

    const yearsElement = e.target.closest('.yearsCalendar tr.days');
    if (yearsElement) {
        let year = (e.target.querySelector('div.date') || e.target).textContent;
        
        router(year);
        return;    
    }
    
    const monthsElement = e.target.closest('.monthCalendar tr');
    if (monthsElement) {
        let year = e.target.closest('.monthCalendar').querySelector('caption').textContent;
        let month = (e.target.querySelector('div.date') || e.target).textContent;

        router(year, parseMonthToNumber(month));
        return;
    } 
    
    if (e.target.tagName === 'CAPTION') {
        let captionArgs = e.target.textContent.split(' ');
        
        if (captionArgs.length === 1) {
            router();
        } else if (captionArgs.length === 2) {
            router(captionArgs[1]);
        }
    }
}
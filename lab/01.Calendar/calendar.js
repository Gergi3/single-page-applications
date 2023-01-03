export function showYear(year) {
    const yearElement = document.getElementById(`year-${year}`);
    yearElement.style.display = 'block';
}

const yearsElement = document.getElementById(`years`);
export function showYears() {
    yearsElement.style.display = 'block';
}

export function showMonth(year, month) {
    const monthElement = document.getElementById(`month-${year}-${month}`);
    monthElement.style.display = 'block';
}

let months = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sept': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12,
}
export function parseMonthToNumber(month) {
    return months[month];
}
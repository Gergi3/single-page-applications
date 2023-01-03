export function submitForm(form, url, method, names, extraBodyData) {
    let formData = new FormData(form);
    let body = {};

    names.forEach(x => {
        body[x] = formData.get(x);
    });
    Object.entries(extraBodyData).forEach(([k, v]) => {
        body[k] = v;
    })

    if (Object.values(body).includes('')) {
        alert('Please fill all fields');
        return false;
    }

    const options = {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    };

    fetch(url, options)
        .catch(err => alert(err.message));
}

export function clearForm(form) {
    let inputs = form.querySelectorAll('input, textarea');
    Array.from(inputs).forEach(x => x.value = '');
}
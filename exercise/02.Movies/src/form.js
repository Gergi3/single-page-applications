async function submitForm(formEl, method, url, inputNames, authToken, extra) {
    const formData = new FormData(formEl);
    
    let data = { };
    (inputNames || []).forEach(name => data[name] = formData.get(name));
    if (Object.values(data).includes('')) {
        alert('Please fill all fields');
        return;
    }

    (Object.entries(extra || {})).forEach(([k, v]) => data[k] = v);
    
    let headers = { 'Content-Type': 'application.json' };
    if (authToken) {
        headers['X-Authorization'] = authToken;
    }
    headers['Content-Type'] = 'application/json';

    const options = {
        method,
        headers,
        body: JSON.stringify(data) || undefined,
    }

    return fetch(url, options);
}

function clearForm(form) {
    Array.from(form.querySelectorAll('input, textarea'))
        .forEach(x => x.value = '');
}

export {
    submitForm,
    clearForm
};
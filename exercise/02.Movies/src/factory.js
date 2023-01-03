function e(type, text, attributes, ...children) {
    if (type === 'textNode') {
        let el = document.createTextNode(text);
        return el;
    }
    let el = document.createElement(type);

    type === 'input' ? el.value = text : el.textContent = text;

    let customAttr = ['owner-id', 'data-id', 'width']
    Object.entries(attributes || {}).forEach(([k, v]) => {
        customAttr.includes(k) ? el.setAttribute(k, v) : el[k] = v
    });

    Array.from(children || []).forEach(child => el.appendChild(child));

    return el;
}

function createMovieCard(movie) {
    return e('div', '', { className: 'card mb-4', 'owner-id': movie._ownerId},
        e('img', '', { className: 'card-img-top', src: movie.img, alt: 'Card image cap', width: '400' }),
        e('div', '', { className: 'card-body' },
            e('h4', movie.title, { className: 'card-title' })
        ),
        e('div', '', { className: 'card-footer' },
            e('a', '', { href: `/movie/${movie._id}` },
                e('button', 'Details', { className: 'btn btn-info', type: 'button'})
            )
        )
    )
}

function createMovie(movie) {
    return e('div', '', { className: 'row bg-light text-dark', 'owner-id': movie._ownerId, 'data-id': movie._id },
        e('h1', `Movie title: ${movie.title}`),
        e('div', '', { className: 'col-md-8' },
            e('img', '', { className: 'img-thumbnail', src: movie.img, alt: 'Movie' }),
        ),
        e('div', '', { className: 'col-md-4 text-center' },
            e('h3', 'Movie Description', { className: 'my-3' }, ),
            e('p', movie.description),
            e('a', 'Delete', { className: 'hidden delete-btn', href: `/delete/${movie._id}`}),
            e('a', 'Edit', { className: 'hidden edit-btn', href: `/edit/${movie._id}`}),
            e('a', 'Like', { className: 'hidden like-btn', href: `/like/${movie._id}`}),
            e('span', `Liked ${movie.likes || -1}`, { className: 'enrolled-span hidden' })
        )
    )
}

export {
    createMovieCard,
    createMovie,
};
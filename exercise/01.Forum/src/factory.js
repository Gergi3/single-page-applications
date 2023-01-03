export function createTopicPreviewElement(topic) {
    return e('div', '', { className: 'topic-container', 'data-id': topic._id },
        e('div', '', { className: 'topic-name-wrapper' },
            e('div', '', { className: 'topic-name' },
                e('a', '', { className: 'normal', href: `/topic/${topic._id}` },
                    e('h2', topic.title)
                ),
                e('div', '', { className: 'columns' },
                    e('div', '', {},
                        e('p', 'Date: ', {},
                            e('time', new Date(Number(topic.time)).toLocaleString())
                        ),
                        e('div', '', { className: 'nick-name' },
                            e('p', 'Username: ', {},
                                e('span', topic.username)
                            )
                        )
                    )
                )
            )
        )
    );
}

export function createTopicElement(topic) {
    return e('div', '', { className: 'header', 'data-id': topic._id },
        e('img', '', { src: './static/profile.png', alt: 'avatar' }),
        e('p', '', {},
            e('span', topic.username),
            e('textNode', ' posted on '),
            e('time', new Date(Number(topic.time)).toLocaleString())
        ),
        e('p', topic.text, { className: 'post-content' })
    );
}

export function createCommentElement(comment) {
    return e('div', '', { className: 'user-comment' },
        e('div', '', { className: 'topic-name-wrapper' },
            e('div', '', { className: 'topic-name' },
                e('p', '', {},
                    e('strong', comment.username),
                    e('textNode', ' commented on '),
                    e('time', new Date(Number(comment.time)).toLocaleString())
                ),
                e('div', '', { className: 'post-content' },
                    e('p', comment.text)
                )
            )
        )
    );
}

function e(type, text, attributes, ...children) {
    if (type === 'textNode') {
        let el = document.createTextNode(text);
        return el;
    }
    let el = document.createElement(type);

    type === 'input' ? el.value = text : el.textContent = text;

    Object.entries(attributes || {}).forEach(([k, v]) => {
        k === 'owner-id' || k === 'data-id' ? el.setAttribute(k, v) : el[k] = v
    });

    Array.from(children || []).forEach(child => el.appendChild(child));

    return el;
}
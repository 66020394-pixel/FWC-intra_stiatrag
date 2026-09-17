function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/; SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
    }
    return null;
}

function saveTodos() {
    const todos = [];
    $('#ft_list .todo-item').each(function() {
        todos.push($(this).text());
    });
    setCookie('ft_list_todos', JSON.stringify(todos), 7);
}

function createTodoItem(text) {
    const $div = $('<div></div>').addClass('todo-item').text(text);
    $div.click(function() {
        if (confirm("Do you really want to delete this TO DO?")) {
            $(this).remove();
            saveTodos();
        }
    });
    return $div;
}

function addTodo(text) {
    if (!text || text.trim() === "") return;
    const $item = createTodoItem(text.trim());
    $('#ft_list').prepend($item);
    saveTodos();
}

$(document).ready(function() {
    $('#new-btn').click(function() {
        const text = prompt("Enter a new TO DO:");
        if (text !== null && text.trim() !== "") {
            addTodo(text);
        }
    });

    const saved = getCookie('ft_list_todos');
    if (saved) {
        try {
            const todos = JSON.parse(saved);
            for (let i = todos.length - 1; i >= 0; i--) {
                const $item = createTodoItem(todos[i]);
                $('#ft_list').prepend($item);
            }
        } catch (e) {
            console.error("Failed to parse cookies", e);
        }
    }
});

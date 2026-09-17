const ftList = document.getElementById('ft_list');
const newBtn = document.getElementById('new-btn');

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
    const items = ftList.querySelectorAll('.todo-item');
    const todos = [];
    items.forEach(item => {
        todos.push(item.textContent);
    });
    setCookie('ft_list_todos', JSON.stringify(todos), 7);
}

function createTodoItem(text) {
    const div = document.createElement('div');
    div.className = 'todo-item';
    div.textContent = text;

    div.addEventListener('click', function() {
        const confirmDelete = confirm("Do you really want to delete this TO DO?");
        if (confirmDelete) {
            div.remove();
            saveTodos();
        }
    });

    return div;
}

function addTodo(text) {
    if (!text || text.trim() === "") return;
    const item = createTodoItem(text.trim());
    ftList.prepend(item);
    saveTodos();
}

newBtn.addEventListener('click', function() {
    const text = prompt("Enter a new TO DO:");
    if (text !== null && text.trim() !== "") {
        addTodo(text);
    }
});

window.addEventListener('load', function() {
    const saved = getCookie('ft_list_todos');
    if (saved) {
        try {
            const todos = JSON.parse(saved);
            for (let i = todos.length - 1; i >= 0; i--) {
                const item = createTodoItem(todos[i]);
                ftList.prepend(item);
            }
        } catch (e) {
            console.error("Failed to parse cookies", e);
        }
    }
});

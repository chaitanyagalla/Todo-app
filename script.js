let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

// Retrieve saved todos from localStorage
function getTodoListFromLocalStorage() {
    let storedTodos = localStorage.getItem("todoList");
    return storedTodos ? JSON.parse(storedTodos) : [];
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length > 0 ? todoList[todoList.length - 1].uniqueNo : 0;

// Save todos to localStorage
function saveTodos() {
    localStorage.setItem("todoList", JSON.stringify(todoList));
}

// Add new todo
function onAddTodo() {
    let userInputElement = document.getElementById("todoUserInput");
    let userInputValue = userInputElement.value.trim();

    if (userInputValue === "") {
        alert("Enter a valid task");
        return;
    }

    todosCount += 1;

    let newTodo = {
        text: userInputValue,
        uniqueNo: todosCount,
        isChecked: false
    };

    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    saveTodos();
    userInputElement.value = "";
}

// Toggle task completion status
function onTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle("checked");

    let todoIndex = todoList.findIndex(todo => "todo" + todo.uniqueNo === todoId);
    if (todoIndex !== -1) {
        todoList[todoIndex].isChecked = checkboxElement.checked;
    }
    saveTodos();
}

// Delete todo
function onDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    if (todoElement) {
        todoElement.remove();
    }

    todoList = todoList.filter(todo => "todo" + todo.uniqueNo !== todoId);
    saveTodos();
}

// Create and append todo to the list
function createAndAppendTodo(todo) {
    let todoId = "todo" + todo.uniqueNo;
    let checkboxId = "checkbox" + todo.uniqueNo;
    let labelId = "label" + todo.uniqueNo;

    let todoElement = document.createElement("li");
    todoElement.classList.add("todo-item-container");
    todoElement.id = todoId;

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;
    inputElement.checked = todo.isChecked;
    inputElement.classList.add("checkbox-input");

    inputElement.onclick = function () {
        onTodoStatusChange(checkboxId, labelId, todoId);
    };

    let labelElement = document.createElement("label");
    labelElement.setAttribute("for", checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add("checkbox-label");
    labelElement.textContent = todo.text;
    if (todo.isChecked) {
        labelElement.classList.add("checked");
    }

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas", "fa-trash-alt", "delete-icon");
    deleteIcon.onclick = function () {
        onDeleteTodo(todoId);
    };

    todoElement.appendChild(inputElement);
    todoElement.appendChild(labelElement);
    todoElement.appendChild(deleteIcon);
    todoItemsContainer.appendChild(todoElement);
}

// Load todos on page load
for (let todo of todoList) {
    createAndAppendTodo(todo);
}

// Add event listeners
addTodoButton.onclick = onAddTodo;
saveTodoButton.onclick = saveTodos;

const todoBody = document.getElementById("todo-body");
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let deletedTodos = JSON.parse(localStorage.getItem("deletedTodos")) || [];

function renderTodos(todosToRender = deletedTodos) {
  todoBody.innerHTML = "";
  todosToRender.forEach((todo, index) => {
    const row = document.createElement("tr");

    // Priority color class
    const priorityClass = `priority-${todo.priority.toLowerCase()}`;

    row.innerHTML = `
      <td>${todo.title}</td>
      <td class="${priorityClass}">${todo.priority}</td>
      <td class="status-cont"> 
        <h6>${todo.status}</h6>
        <button onclick="toggleStatus(${index})" class="archive-btn">${
          todo.status === "Pending" ? "Mark Completed" : "Mark Pending"
        }</button>
      </td>
      <td>
        <button onclick="restoreTodo(${index})" class="archive-btn">Restore</button>
      </td>
      <td>
        <button onclick="deleteTodo(${index})" class="archive-btn">Delete</button>
      </td>
    `;
    todoBody.appendChild(row);
  });
}

function toggleStatus(index) {
  deletedTodos[index].status = deletedTodos[index].status === "Pending" ? "Completed" : "Pending";
  localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos));
  applyFilters();
}

function restoreTodo(index) {
  const restoredTodo = deletedTodos.splice(index, 1)[0];
  todos.push(restoredTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos));
  applyFilters();
}

function deleteTodo(index) {
  deletedTodos.splice(index, 1);
  localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos));
  applyFilters();
}

function applyFilters() {
  const statusFilter = document.getElementById("status-filter").value;
  const priorityFilter = document.getElementById("priority-filter").value;

  let filteredTodos = deletedTodos.filter(todo => {
    return (
      (statusFilter === "All" || todo.status === statusFilter) &&
      (priorityFilter === "All" || todo.priority === priorityFilter)
    );
  });

  renderTodos(filteredTodos);
}

document.addEventListener("DOMContentLoaded", () => {
  renderTodos();
});

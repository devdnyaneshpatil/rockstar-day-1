const todoInput = document.getElementById("todo-input");
      const prioritySelect = document.getElementById("priority");
      const todoForm = document.getElementById("todo-form");
      const todoBody = document.getElementById("todo-body");

      let todos = JSON.parse(localStorage.getItem("todos")) || [];
      let deletedTodos = JSON.parse(localStorage.getItem("deletedTodos")) || [];

      // Function to render todos in the table
      function renderTodos() {
        console.log(deletedTodos)
        todoBody.innerHTML = ""; 
        todos.forEach((todo, index) => {
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
              <button onclick="deleteTodo(${index})" class="archive-btn">Archive</button>
            </td>
          `;
          todoBody.appendChild(row);
        });
      }

      // Function to add a new todo
      todoForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const newTodo = {
          title: todoInput.value.trim(),
          priority: prioritySelect.value,
          status: "Pending",
        };

        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));

        todoInput.value = "";
        prioritySelect.selectedIndex = 0;

        renderTodos();
      });

      // Function to toggle the status of a todo
      function toggleStatus(index) {
        todos[index].status =
          todos[index].status === "Pending" ? "Completed" : "Pending";
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTodos();
      }

      // Function to delete (archive) a todo
      function deleteTodo(index) {
        const deletedTodo = todos.splice(index, 1)[0];
        deletedTodos.push(deletedTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        localStorage.setItem("deletedTodos", JSON.stringify(deletedTodos));
        renderTodos();
      }

      // Initial render
      renderTodos();
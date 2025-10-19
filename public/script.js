const todosContainer = document.querySelector(".todos-container");
const inputText = document.getElementById("input-text");
const addButton = document.getElementById("add-button");
const trashIcon = document.querySelector(".trash-icon");

const getTodos = async () => {
  try {
    const response = await fetch("/api/todos");
    if (!response.ok) {
      throw new Error("Network response was not seccusseful");
    }
    const data = await response.json();

    let todosHtml = "";
    data.map((todo) => {
      todosHtml += `
        <div class="todo-container">
          <input type="checkbox" id="${todo.id}" class="todo-checkbox" ${
        todo.completed ? "checked" : ""
      } onclick="editTodo(${todo.id}, this)" />
          <label for="${todo.id}" class="todo-item-label">
          <div class="seperated">
            <span class="task-text text-gray-800 font-medium text-base">
              ${todo.name}
            </span>
            <i class="fa-solid fa-trash trash-icon" onclick="deleteTodo(${
              todo.id
            })"></i> 
            </div>
          </label>
          
        </div>
      `;
    });
    todosContainer.innerHTML = todosHtml;
  } catch (error) {
    console.error("Error:", error);
  }
};

addButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const data = inputText.value;
  if (!data) {
    return;
  }

  try {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: data }),
    });
    if (response.ok) {
      inputText.value = "";
      getTodos();
    } else {
      console.error("Failed to add todo");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

const editTodo = async (id, checkbox) => {
  const isCompleted = checkbox.checked;
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed: isCompleted }),
    });

    if (response.ok) {
      getTodos();
    } else {
      console.error("Failed to edit todo");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

const deleteTodo = async (id) => {
  try {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      getTodos();
    } else {
      console.error("Failed to delete todo");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};

getTodos();

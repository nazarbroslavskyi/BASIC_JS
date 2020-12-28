

export class TodoItem {
  constructor(
    name,
    isDone,
    creationDate,
    creationDateValue,
    closingDate,
    closingDateValue
  ) {
    this.name = name;
    this.isDone = isDone || false;
    this.creationDate = creationDate || tranformDate(new Date());
    this.creationDateValue = creationDateValue || Date.now();
    this.closingDate = closingDate || null;
    this.closingDateValue = closingDateValue || Date.now();
    this.isEditMode = false;
  }

  triggerStatus() {
    this.isDone = !this.isDone;
    this.closingDate = this.isDone ? tranformDate(new Date()) : null;
  }
}

const sortOptions = [
  "Text (Asc)",
  "Text (Desk)",
  "Date creation (Asc)",
  "Date creation (Desk)",
];

const doneSortOptions = [
  ...sortOptions,
  "Date complete (Asc)",
  "Date complete (Desk)",
];

export const TodoListComponent = (todoItems, title, selectedSortingOption) =>
  !todoItems.length
    ? ""
    : `
  <div class="${title.toLowerCase()}-todo-list__header">
    <h2 class="${title.toLowerCase()}-todo-list__title">${title}</h2>
    <select 
      class="${title.toLowerCase()}-todo-list__select"
      value="Date creation (Asc)" 
      onchange="selectedSortingOptions['${title.toLowerCase()}'] = this.value; updateView();" 
    >
      ${(title === "Done" ? doneSortOptions : sortOptions)
        .map(
          (option) =>
            `<option ${
              selectedSortingOption === option ? "selected" : ""
            }>${option}</option>`
        )
        .join("")}
    </select>
  </div>
  ${sortTodo(todoItems, selectedSortingOption)
    .map((todo) => TodoItemComponent(todo))
    .join("")}
  <div class="${title.toLowerCase()}-todo-list__clear-button-wrapper">
    <button
      onclick="todoList.deleteListByFlag('${title}'); updateView();"
      class="${title.toLowerCase()}-todo-list__clear-button"
    >Clear "${title}" list</button>
  </div>
`;

export const TodoItemComponent = (todoItem) => `
  <div class="todo-item">
    <div class="todo-item__left-side">
      <input
        type="checkbox" 
        class="todo-item__checkbox" 
        ${todoItem.isDone ? "checked" : ""} 
        onclick="todoList.triggerTodoStatusByMessage('${
          todoItem.name
        }'); updateView();"
      />
      ${
        todoItem.isEditMode
          ? `
        <input
          id="editable-input"
          value='${todoItem.name}'
          onkeyup="callEventHandlers(enterPresed(() => todoList.updateTodoInEdidMode(), updateView), escapePresed(() => todoList.closeEdidMode(), updateView))(event);"
          ondblclick="todoList.updateTodoInEdidMode(); updateView()"
        />
      `
          : `<p ondblclick="todoList.editTodoByMessage('${todoItem.name}'); updateView();"
          >${todoItem.name}</p>`
      }   
    </div>
    <div class="todo-item__right-side">
      <div class="todo-item__date">
        <p>${todoItem.creationDate}</p>
        ${todoItem.closingDate ? "<p>" + todoItem.closingDate + "</p>" : ""}
      </div>
      <div 
        class="todo-item__trash"
        onclick="todoList.deleteTodoByMessage('${
          todoItem.name
        }'); updateView();"
      >${trashIcon}</div>
    </div>
  </div>
`;


class TodoStorage {
  constructor(place, todoListData) {
    this.place = place;
    this.todoListData = todoListData;
  }

  saveData() {
    localStorage.setItem(
      this.place,
      JSON.stringify(this.todoListData.todoItems)
    );
  }

  getData(fn) {
    fn(JSON.parse(localStorage.getItem(this.place)) || []);
  }
}

export class TodoList {
  constructor(todoItems = []) {
    this.todoItems = todoItems;
    this.todoInEditMode = null;
  }

  addTodo(todo) {
    this.todoItems.push(todo);
    this.closeEdidMode();
  }

  editTodoByMessage(message) {
    this.closeEdidMode();
    this.todoInEditMode = this.todoItems.find((todo) => todo.name === message);
    this.todoInEditMode.isEditMode = true;
  }

  updateTodoInEdidMode() {
    this.todoInEditMode.name = document.getElementById("editable-input").value;
    this.closeEdidMode();
  }

  triggerTodoStatusByMessage(message) {
    this.todoItems.find((todo) => todo.name === message).triggerStatus();
    this.closeEdidMode();
  }

  deleteTodoByMessage(message) {
    const index = this.todoItems.findIndex((todo) => todo.name === message);
    this.todoItems.splice(index, 1);
    this.closeEdidMode();
  }

  closeEdidMode() {
    if (this.todoInEditMode) {
      this.todoInEditMode.isEditMode = false;
      this.todoInEditMode = null;
    }
  }

  replaceTodoByMessage(message) {
    this.deleteTodoByMessage(message);
    this.addTodo(new TodoItem(message));
  }

  has(message) {
    return !!this.todoItems.find((todo) => todo.name === message);
  }

  deleteListByFlag(flag) {
    const isDone = flag === "Done";
    this.todoItems = this.todoItems.filter((todo) => isDone !== todo.isDone);
  }

  get openedTodoItems() {
    return this.todoItems.filter((todo) => !todo.isDone);
  }

  get closedTodoItems() {
    return this.todoItems.filter((todo) => todo.isDone);
  }
}




window.callEventHandlers = callEventHandlers;
window.enterPresed = enterPresed;
window.escapePresed = escapePresed;
window.todoList = new TodoList();
window.selectedSortingOptions = {
  open: "Date creation (Asc)",
  done: "Text (Desk)",
};

const searchingInput = document.querySelector(".header__searching-input");
const newTaskInput = document.querySelector(".create-task-section__input");
const newTaskButton = document.querySelector(".create-task-section__button");
const root = document.getElementById("root");

const storage = new TodoStorage("todoItems", todoList);

storage.getData((todoItems) =>
  todoItems.forEach((todo) =>
    todoList.addTodo(
      new TodoItem(
        todo.name,
        todo.isDone,
        todo.creationDate,
        todo.creationDateValue,
        todo.closingDate,
        todo.closingDateValue
      )
    )
  )
);

const addTodo = () => {
  const inputValue = newTaskInput.value.trim();
  if (!inputValue) {
    return;
  }
  if (todoList.has(inputValue)) {
    if (confirm(`You've "${inputValue}" TODO. Do you want to replace it?`)) {
      todoList.replaceTodoByMessage(inputValue);
    }
  } else {
    todoList.addTodo(new TodoItem(inputValue));
  }
  newTaskInput.value = "";
  updateView();
};



// APP
const TodoAppComponent = (
  todoList,
  searchingValue,
  selectedSortingOptions
) => `
  ${TodoListComponent(
    searchInTodoList(todoList.openedTodoItems, searchingValue),
    "Open",
    selectedSortingOptions.open
  )}
  ${TodoListComponent(
    searchInTodoList(todoList.closedTodoItems, searchingValue),
    "Done",
    selectedSortingOptions.done
  )}
`;


window.updateView = () => {
  storage.saveData();
  root.innerHTML = TodoAppComponent(
    todoList,
    searchingInput.value,
    selectedSortingOptions
  );
  focusOnTodoInput();
};

searchingInput.oninput = updateView;
newTaskButton.onclick = addTodo;
newTaskInput.onkeyup = enterPresed(addTodo, () => newTaskInput.blur());

updateView();



// HELPERS 


export const callEventHandlers = (...handlers) => (event) => {
  handlers.forEach((handler) => handler(event));
};

export const enterPresed = (...handlers) => (keyEvent) => {
  if (keyEvent.code === "Enter") {
    handlers.forEach((handler) => {
      handler();
    });
  }
};

export const escapePresed = (...handlers) => (keyEvent) => {
  if (keyEvent.code === "Escape") {
    handlers.forEach((handler) => {
      handler();
    });
  }
};

export const focusOnTodoInput = () => {
  const focusedInput = document.getElementById("editable-input");
  if (focusedInput) {
    focusedInput.focus();
  }
};

export const searchInTodoList = (todoList, searchingValue) =>
  todoList.filter((todo) =>
    !searchingValue.trim()
      ? true
      : `${todo.name} ${todo.creationDate} ${
          todo.closingDate ? todo.closingDate : ""
        }`
          .toLowerCase()
          .includes(searchingValue.trim().toLowerCase())
  );


  export const sortTodo = (todos, sortingOption) => {
    return [...todos].sort((leftTodo, rightTodo) => {
      switch (sortingOption) {
        case "Date creation (Asc)":
          return leftTodo.creationDateValue - rightTodo.creationDateValue;
        case "Date creation (Desk)":
          return rightTodo.creationDateValue - leftTodo.creationDateValue;
        case "Date complete (Asc)":
          return leftTodo.closingDateValue - rightTodo.closingDateValue;
        case "Date complete (Desk)":
          return rightTodo.closingDateValue - leftTodo.closingDateValue;
        case "Text (Asc)":
          return leftTodo.name.length - rightTodo.name.length;
        case "Text (Desk)":
        default:
          return rightTodo.name.length - leftTodo.name.length;
      }
    });
  };


  export const tranformDate = (date) =>
  date
    .toLocaleDateString("de-DE", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .split(" ")
    .slice(1)
    .join(" ");
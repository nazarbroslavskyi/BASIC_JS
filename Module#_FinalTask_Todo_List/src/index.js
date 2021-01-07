import "./styles.scss";

class Model {
  constructor() {
    this.initialTodos = JSON.parse(localStorage.getItem("todos")) ? JSON.parse(localStorage.getItem("todos")) : [];
    this.todos = JSON.parse(localStorage.getItem("todos")) ? JSON.parse(localStorage.getItem("todos")) : [];
  }

  addTodo(todoText) {
    console.log(todoText);
    let todoId = this.todos.reduce((accum, elem) => {
      accum = elem.id > accum ? elem.id : accum;
      return accum;
    }, 0)

    const todo = {
      done: false,
      description: todoText,
      dataCreation: this.tranformDate(new Date()),
      dateOfCreation: new Date(),
      resolveData: null,
      dueDate: null,
      id: ++todoId,
    }

    this.todos.push(todo);
    this.onTodoListChanged(this.todos);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  tranformDate(date) {
    return date
      .toLocaleDateString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .split(" ")
      .slice(1)
      .join(" ");
  }

  editTodo(id, updatedText) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, description: updatedText } : todo,
    )
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  handleDeleteDoneList() {
    this.todos = this.todos.filter((todo) => !todo.done)
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.initialTodos = this.todos;
    this.onTodoListChanged(this.todos);
  }

  handleDeleteOpenList() {
    this.todos = this.todos.filter((todo) => todo.done)
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.initialTodos = this.todos;
    this.onTodoListChanged(this.todos);
  }

  deleteTodo(id) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.onTodoListChanged(this.todos);
    this.initialTodos = this.todos;
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  bindTodoListChanged(callback) {
    this.onTodoListChanged = callback;
  }

  toggleTodo(id) {
    this.todos = this.todos.map((todo) => {
      return todo.id === id ? { ...todo, done: !todo.done, dueDate: todo.resolveData ? null : new Date(), resolveData: todo.resolveData ? null : this.tranformDate(new Date()) } : todo
    }
    )

    this.onTodoListChanged(this.todos);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  handleEdit(todoId, newValue) {
    this.todos = this.todos.map((todo) => {
      return todo.id === todoId ? { ...todo, description: newValue.trim() || todo.description } : todo;
    });
    console.log(this);
    this.initialTodos = this.todos;
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.onTodoListChanged(this.todos);

  }

  filterByHeaderSearch(searchText) {
    this.todos = this.initialTodos.filter((todo) => {
      return todo.description.startsWith(searchText) ? true : false;
    })
    this.onTodoListChanged(this.todos);
  }

  handleSort(typeOfSort, stateOfList) {
    console.log('handle sort', typeOfSort, stateOfList);
    if (stateOfList === 'open')
      switch (typeOfSort) {
        case 'DESC_DATA_CREATION':
          this.todos = this.todos.sort((a, b) => new Date(b.dateOfCreation) - new Date(a.dateOfCreation));
          this.initialTodos = this.todos;
          this.onTodoListChanged(this.todos);
          break;
        case 'ASC_DATA_CREATION':
          this.todos = this.todos.sort((a, b) => new Date(a.dateOfCreation) - new Date(b.dateOfCreation));
          this.initialTodos = this.todos;
          this.onTodoListChanged(this.todos);
          break;
        case 'ASC_RECORDS':
          this.todos = this.todos.sort((a, b) => a.description.localeCompare(b.description));
          this.initialTodos = this.todos;
          this.onTodoListChanged(this.todos);
          break;

        case 'DESC_RECORDS':
          this.todos = this.todos.sort((a, b) => b.description.localeCompare(a.description));
          this.initialTodos = this.todos;
          this.onTodoListChanged(this.todos);
          break;
      }

    if (stateOfList === 'done') {
      switch (typeOfSort) {
        case 'ASC_DUE_DATE':
          this.todos = this.todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
          this.initialTodos = this.todos;
          this.onTodoListChanged(this.todos);
          break;
        case 'DESC_DUE_DATE':
          this.todos = this.todos.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
          this.initialTodos = this.todos;
          this.onTodoListChanged(this.todos);
          break;
        case 'ASC_RECORDS':
          this.todos = this.todos.sort((a, b) => a.description.localeCompare(b.description));
          this.initialTodos = this.todos;
          this.onTodoListChanged(this.todos);
          break;
        case 'DESC_RECORDS':
          this.todos = this.todos.sort((a, b) => b.description.localeCompare(a.description));
          this.initialTodos = this.todos;
          this.onTodoListChanged(this.todos);
          break;
      }
    }
  }
}

class View {
  constructor() {
    const rootEelem = document.querySelector('#root-elem');
    this.headerSearch = document.querySelector('.header__search');
    this.app = document.querySelector('#root');
    this.form = this.createElement('form');
    this.formContainer = this.createElement('div');
    this.formContainer.classList.add('add-task-section');
    console.log(this.formContainer);

    this.input = this.createElement('input');
    this.input.placeholder = 'New task...';
    this.input.classList.add('add-task-section__input');

    this.addBtn = this.createElement('button');
    this.addBtn.classList.add('add-task-section__add-btn');
    this.addBtn.textContent = 'Add';

    this.todoList = this.createElement('ul', 'todo-list')

    this.formContainer.append(this.input, this.addBtn);

    this.app.append(this.formContainer, this.todoList);

    this.doneSelectValue = 'ASC_DUE_DATE';
    this.openSelectValue = 'ASC_DATA_CREATION';
  }

  createElement(tag, className) {
    const element = document.createElement(tag)
    if (className) element.classList.add(className)

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector)

    return element
  }

  displayTodos(todos) {
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild)
    }

    let doneTodos = document.createDocumentFragment();
    let openTodos = document.createDocumentFragment();

    todos.forEach(todo => {
      const div = this.createElement('div');
      div.classList.add('todo-item');

      const itemDescription = this.createElement('div');
      itemDescription.classList.add('todo-item__description');

      const label = this.createElement('div');
      label.classList.add('checkbox-container');

      itemDescription.append(label);

      const input = this.createElement('input');
      input.type = 'checkbox';
      input.checked = todo.done;

      const span = this.createElement('span');
      span.classList.add('checkmark');

      const todoDescription = this.createElement('span');
      todoDescription.classList.add('todo-description');
      todoDescription.textContent = todo.description;

      label.append(todoDescription, input, span);

      const time = this.createElement('div');
      time.classList.add('trash-icon-and-time');

      const trashBtnAndTime = this.createElement('div');
      trashBtnAndTime.classList.add('trash-icon-and-time');

      const timeCreation = this.createElement('div');
      timeCreation.classList.add('todo-item__time');

      const doneTime = this.createElement('div');
      doneTime.classList.add('trash-icon-wrapper');


      const timeCreate = this.createElement('div');
      timeCreate.classList.add('todo-item__time-creation');

      const doneTim = this.createElement('div');
      doneTim.classList.add('todo-item__done-time');

      timeCreate.textContent = todo.dataCreation;
      doneTim.textContent = todo.resolveData ? todo.resolveData : null;

      timeCreation.append(timeCreate, doneTim)

      const trashIcon = this.createElement('img', 'delete');
      trashIcon.classList.add('trash-icon');
      trashIcon.src = 'https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_delete_48px-128.png';

      doneTime.append(trashIcon);

      time.append(timeCreation, doneTime);
      trashBtnAndTime.append(time);

      div.append(itemDescription, time);

      div.id = todo.id


      if (todo.done) {
        doneTodos.appendChild(div);
      } else {
        openTodos.append(div)
      }
    })

    if (openTodos.children.length > 0) {
      this.todoList.append(this.createTodoHeader('open'))
      this.todoList.append(openTodos);
      const clearBtnContainer = this.createElement('div', 'clear-list-item');
      this.clearOpenBtn = this.createElement('button', 'clear-btn');
      this.clearOpenBtn.textContent = `Clear 'Open' List`;
      clearBtnContainer.append(this.clearOpenBtn);
      this.todoList.append(clearBtnContainer);
    }
    if (doneTodos.children.length > 0) {
      this.todoList.append(this.createTodoHeader('done'))
      this.todoList.append(doneTodos);
      const clearBtnContainer = this.createElement('div', 'clear-list-item');
      this.clearDoneBtn = this.createElement('button', 'clear-btn');
      this.clearDoneBtn.textContent = `Clear 'Done' list`;
      clearBtnContainer.append(this.clearDoneBtn);
      this.todoList.append(clearBtnContainer);
    }
  }

  createTodoHeader(state) {
    const todoHeader = this.createElement('div', 'todo-header');
    const stateOfList = this.createElement('div');
    stateOfList.textContent = state === 'open' ? 'Open' : 'Done';

    let array = [
      { order: 'asc', text: 'Data Creation (Asc)', state: 'open', value: 'ASC_DATA_CREATION' },
      { order: 'desc', text: 'Data Creation (Desc)', state: 'open', value: 'DESC_DATA_CREATION' },
      { order: 'asc', text: 'Due Date (Asc)', state: 'done', value: 'ASC_DUE_DATE' },
      { order: 'desc', text: 'Due Date (Desc)', state: 'done', value: 'DESC_DUE_DATE' },
      { order: 'asc', text: 'Records (Asc)', state: 'done', value: 'ASC_RECORDS' },
      { order: 'desc', text: 'Records (Desc)', state: 'open', value: 'DESC_RECORDS' },
      { order: 'asc', text: 'Records (Asc)', state: 'open', value: 'ASC_RECORDS' },
      { order: 'desc', text: 'Records (Desc)', state: 'done', value: 'DESC_RECORDS' },
    ];

    if (state === 'open') {
      this.selectList = document.createElement("select");
      for (let i = 0; i < array.length; i++) {
        if (array[i].state === state) {
          let option = document.createElement("option");
          option.value = array[i].value;
          option.text = array[i].text;
          this.selectList.appendChild(option);
        }
      }

      todoHeader.append(stateOfList, this.selectList);
    }
    if (state === 'done') {
      this.doneSelectList = document.createElement("select");
      for (let i = 0; i < array.length; i++) {
        if (array[i].state === state) {
          let option = document.createElement("option");
          option.value = array[i].value;
          option.text = array[i].text;
          this.doneSelectList.appendChild(option);
        }
      }

      todoHeader.append(stateOfList, this.doneSelectList);
    }

    return todoHeader;
  }

  bindAddTodo(handler) {
    if (this.addBtn) {
      this.addBtn.addEventListener('click', event => {
        if (this.input.value.length > 0) {
          handler(this.input.value);
          this.input.value = '';
        }
      })

      this.input.addEventListener('keyup', ({ key }) => {
        if (key === "Enter") {
          if (this.input.value.length > 0) {
            handler(this.input.value);
            this.input.value = '';
          }
        }

      })
    }
  }

  bindclearAllDoneList(handler) {
    if (this.clearDoneBtn) {
      this.clearDoneBtn.addEventListener('click', event => {
        handler();
      })
    }

  }

  bindclearAllOpenList(handler) {
    if (this.clearOpenBtn) {
      this.clearOpenBtn.addEventListener('click', event => {
        handler();
      })
    }

  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener('click', event => {
      if (event.target.classList.contains('delete')) {
        console.log('delete');
        const id = +event.target.closest(".todo-item").id;

        handler(id)
      }
    })
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener('click', event => {
      if (event.target.classList.contains('checkmark')) {
        console.log('to');
        const id = +event.target.closest(".todo-item").id;
        handler(id)
      }
    })
  }

  bindEditTodo(handler) {
    this.todoList.addEventListener('dblclick', event => {
      console.log('dbclicfrfrffrfrfrfrf');
      if (event.target.classList.contains('todo-description')) {
        const id = +event.target.closest(".todo-item").id;
        const editinput = document.createElement("INPUT");
        editinput.setAttribute("type", "text");
        editinput.setAttribute("value", event.target.textContent);
        event.target.replaceWith(editinput);
        editinput.focus();
        let text = event.target.textContent;

        editinput.onblur = function () {
          updateInput(text);
        }

        editinput.onkeyup = function ({ key }) {
          if (key === "Enter") {
            text = editinput.value;
            editinput.blur();
          }
          if (key === 'Escape') {
            text = event.target.textContent;
            editinput.blur();
          }
        }

        function updateInput(value) {
          const todoDescription = document.createElement("span");
          todoDescription.setAttribute("class", "todo-description");
          todoDescription.textContent = value;
          editinput.replaceWith(todoDescription);
          handler(id, value)
        }

      }
    })
  }

  bindHeaderSearch(handler) {
    this.headerSearch.addEventListener('input', (event) => {
      handler(event.target.value)
    })
  }

  bindSortList(handler) {
    if (this.selectList) {
      this.selectList.addEventListener('change', (event) => {

        handler(event.target.value, 'open')

        this.openSelectValue = event.target.value;
        this.selectList.value = this.openSelectValue;
      });
    }

    if (this.doneSelectList) {
      this.doneSelectList.addEventListener('change', (event) => {
        handler(event.target.value, 'done')
        this.doneSelectValue = event.target.value;
        this.doneSelectList.value = this.doneSelectValue;
      });
    }
  }

}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.handleDeleteTodo = (id) => {
      this.model.deleteTodo(id);
    }

    this.handleToggleTodo = (id) => {
      this.model.toggleTodo(id);
    }

    this.handleAddTodo = (todoText) => {
      this.model.addTodo(todoText);
    }

    this.handleHeaderFilterSearch = (searchText) => {
      this.model.filterByHeaderSearch(searchText)
    }

    this.handleDeleteDoneList = () => {
      this.model.handleDeleteDoneList()
    }

    this.handleDeleteOpenList = () => {
      this.model.handleDeleteOpenList()
    }

    this.handleSort = (typeOfSort, stateOfList) => {
      this.model.handleSort(typeOfSort, stateOfList);
    }

    this.handleEditTodo = (todoId, newValue) => {
      this.model.handleEdit(todoId, newValue);
    }

    this.onTodoListChanged(this.model.todos);
    this.view.bindAddTodo(this.handleAddTodo)
    this.view.bindDeleteTodo(this.handleDeleteTodo)
    this.view.bindToggleTodo(this.handleToggleTodo);
    this.view.bindHeaderSearch(this.handleHeaderFilterSearch);
    this.view.bindclearAllDoneList(this.handleDeleteDoneList);
    this.view.bindclearAllOpenList(this.handleDeleteOpenList);
    this.model.bindTodoListChanged(this.onTodoListChanged.bind(this));
    this.view.bindSortList(this.handleSort);
    this.view.bindEditTodo(this.handleEditTodo);
  }

  onTodoListChanged(todos) {
    this.view.displayTodos(todos);
    this.view.bindclearAllDoneList(this.handleDeleteDoneList);
    this.view.bindclearAllOpenList(this.handleDeleteOpenList);
    this.view.bindSortList(this.handleSort);
  }

  handleEditTodo(id, todoText) {
    this.model.editTodo(id, todoText);
  }
}

const app = new Controller(new Model(), new View());
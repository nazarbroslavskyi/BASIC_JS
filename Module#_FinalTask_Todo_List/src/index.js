import "./styles.scss";
import TodoItem from './components/todo-item';

class TodoItemClass {
  constructor(id, done, description, dataCreation, resolveData) {
    this.done = done;
    this.description = description;
    this.dataCreation = dataCreation;
    this.resolveData = resolveData;
    this.id = id;
  }
}

class Model {
  constructor() {
    // this.todos = [new TodoItemClass(1, false, 'feed a dog', new Date(), null), new TodoItemClass(2, false, 'make a homework', new Date(), new Date()) ]
    this.initialTodos = JSON.parse(localStorage.getItem("todos"));
    this.todos = JSON.parse(localStorage.getItem("todos"));
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
      resolveData: null,
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
    console.log(this);
    this.todos = this.todos.filter((todo) => !todo.done)
    localStorage.setItem("todos", JSON.stringify(this.todos));
    this.initialTodos = this.todos;
    this.onTodoListChanged(this.todos);
  }

  handleDeleteOpenList() {
    console.log(this);
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
    this.onTodoListChanged = callback
  }

  toggleTodo(id) {
    console.log(id);
    console.log(this.todos);

    this.todos = this.todos.map((todo) => {
      console.log(todo)
      return todo.id === id ? { ...todo, done: !todo.done, resolveData: todo.resolveData ? null : this.tranformDate(new Date()) } : todo
    }
    )

    this.onTodoListChanged(this.todos);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  filterByHeaderSearch(searchText) {
    this.todos = this.initialTodos.filter((todo) => {
      console.log(todo);
      return todo.description.startsWith(searchText) ? true : false;
    })
    this.onTodoListChanged(this.todos);
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

      const label = this.createElement('label');
      label.classList.add('checkbox-container');

      itemDescription.append(label);

      const input = this.createElement('input');
      input.type = 'checkbox';
      input.checked = todo.done;

      const span = this.createElement('span');
      span.classList.add('checkmark');

      label.append(todo.description, input, span);

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
        console.log(doneTodos);
      } else {
        openTodos.append(div)
      }
    })

    console.log(doneTodos);
    console.log(openTodos);

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

    let array = ['data creation',];

    //Create and append select list
    let selectList = document.createElement("select");
    selectList.id = "mySelect";

    //Create and append the options
    for (let i = 0; i < array.length; i++) {
      let option = document.createElement("option");
      option.value = array[i];
      option.text = array[i];
      selectList.appendChild(option);
    }

    todoHeader.append(stateOfList, selectList);
    // this.todoList.append(todoHeader)
    return todoHeader;
  }

  bindAddTodo(handler) {
    if(this.addBtn) {
      this.addBtn.addEventListener('click', event => {
        console.log('click');
        console.log(this.input.value);
        if(this.input.value.length > 0) {
        handler(this.input.value);
        this.input.value = '';

        }

        this.cr
      })
    }
  }

  bindclearAllDoneList(handler) {
    if(this.clearDoneBtn) {
      console.log('delete open');
      this.clearDoneBtn.addEventListener('click', event => {
        handler();
      })
    }
    
  }

  bindclearAllOpenList(handler) {
    console.log('del open')
    if(this.clearOpenBtn) {
      this.clearOpenBtn.addEventListener('click', event => {
        handler();
      })
    }
   
  }

  bindDeleteTodo(handler) {
    console.log(this.todoList);
    this.todoList.addEventListener('click', event => {
      if (event.target.classList.contains('delete')) {
        console.log('delete');
        const id = +event.target.closest(".todo-item").id;

        handler(id)
      }
    })
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener('change', event => {
      if (event.target.type === 'checkbox') {
        console.log('to');
        const id = +event.target.closest(".todo-item").id;

        handler(id)
      }
    })
  }

  bindHeaderSearch(handler) {
    this.headerSearch.addEventListener('input', (event) => {
      console.log(event.target.value);
      handler(event.target.value)
    })
  }

}

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    console.log(this.view);
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

    this.onTodoListChanged(this.model.todos);
    this.view.bindAddTodo(this.handleAddTodo)
    this.view.bindDeleteTodo(this.handleDeleteTodo)
    this.view.bindToggleTodo(this.handleToggleTodo);
    this.view.bindHeaderSearch(this.handleHeaderFilterSearch);
    this.view.bindclearAllDoneList(this.handleDeleteDoneList);
    this.view.bindclearAllOpenList(this.handleDeleteOpenList);
    this.model.bindTodoListChanged(this.onTodoListChanged.bind(this))
  }

  onTodoListChanged(todos) {
    this.view.displayTodos(todos);
    this.view.bindclearAllDoneList(this.handleDeleteDoneList);
    this.view.bindclearAllOpenList(this.handleDeleteOpenList);
  }

  handleEditTodo(id, todoText) {
    this.model.editTodo(id, todoText);
  }
}

const app = new Controller(new Model(), new View());
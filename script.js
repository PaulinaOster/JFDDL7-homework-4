class ToDoList {
    constructor(selector) {
        this.container = document.querySelector(selector) || document.body;
        this.tasks = JSON.parse(localStorage.getItem('to-do-list')) || [{
            text: 'Zadanie do wykonania',
            isCompleted: false,
        }];
        this.render();
    }
    saveTasks() {
        localStorage.setItem('to-do-list', JSON.stringify(this.tasks))
    }
    render() {
        this.container.innerHTML = "";
        this.renderForm();
        this.tasks.forEach(
            (task, index) => this.renderTask(task, index)
        )
    }
    toggleTask(taskIndex) {
        this.tasks = this.tasks.map(
            (task, index) => index === taskIndex ?
                {
                    text: task.text,
                    isCompleted: !task.isCompleted,
                }
                :
                task
        )
        this.saveTasks();
        this.render();
    }
    removeTask(taskIndex) {
        this.tasks.splice(taskIndex, 1);
        this.saveTasks();
        this.render();
    }
    renderTask(task, index) {
        const div = document.createElement('div');
        const span = document.createElement('span');
        const button = document.createElement('button');
        span.innerText = task.text;
        button.innerText = "usuń"
        if (task.isCompleted) {
            div.style.textDecoration = 'line-through'
        }
        span.addEventListener(
            'click',
            () => this.toggleTask(index)
        );
        button.addEventListener(
            'click',
            () => this.removeTask(index)
        );
        div.appendChild(span);
        div.appendChild(button);
        this.container.appendChild(div);
    }
    renderForm() {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const button = document.createElement('button');

        button.innerText = 'dodaj zadanie';
        input.setAttribute('placeholder', 'Nowe zadanie');

        button.addEventListener(
            'click',
            () => this.addTask(input.value)
        )

        div.appendChild(input);
        div.appendChild(button);
        this.container.appendChild(div);
    }
    addTask(newTaskText) {
        const newTask = {
            text: newTaskText,
            isCompleted: false,
        }
        this.tasks.push(newTask);
        this.saveTasks();
        this.render();
    }
}
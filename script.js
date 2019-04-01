class ToDoList {
    constructor(selector) {
        this.container = document.querySelector(selector) || document.body;
        this.tasks = JSON.parse(localStorage.getItem('to-do-list')) || [{
            text: 'Zadanie do wykonania',
            isCompleted: false,
        }];
        this.filteredTasks = null;
        this.stringQuery = null;
        this.statusQuery = 'all';

        this.render();
    }
    saveTasks() {
        localStorage.setItem('to-do-list', JSON.stringify(this.tasks))
    }
    render() {
        this.container.innerHTML = "";
        this.renderForm();
        this.renderQueryForm();
        this.filterTasks();
        console.log(this.tasks, this.filteredTasks);
        this.tasks.forEach(
            (task, index) => {
                for (let i = 0; i < this.filteredTasks.length; i++) {
                    if (task.text === this.filteredTasks[i].text) this.renderTask(task, index)
                }
            }
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
    filterTasks() {
        if (this.stringQuery) {
            this.filteredTasks = this.tasks.filter(
                task => task.text.includes(this.stringQuery)
            )
        } else {
            this.filteredTasks = this.tasks.filter(
                task => {
                    return (this.statusQuery === 'all' ? (task.isCompleted === this.statusQuery) || (task.isCompleted !== this.statusQuery)
                        : (task.isCompleted === this.statusQuery));
                }
            );
        }
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
            () => {
                if (input.value) this.addTask(input.value);
            }
        )

        div.appendChild(input);
        div.appendChild(button);
        this.container.appendChild(div);
    }
    renderQueryForm() {
        const div = document.createElement('div');
        const input = document.createElement('input');
        const button1 = document.createElement('button');
        const button2 = document.createElement('button');
        const button3 = document.createElement('button');
        const button4 = document.createElement('button');

        button1.innerText = 'wyszukaj wg słowa kluczowego';
        button2.innerText = 'wyświetl wszystkie';
        button3.innerText = 'wyświetl zakończone';
        button4.innerText = 'wyświetl nieukończone';
        input.setAttribute('placeholder', 'słowo kluczowe');
        if (this.stringQuery) input.value = this.stringQuery;

        button1.addEventListener(
            'click',
            () => {
                examineInputValue(input.value);
                this.render();
                this.stringQuery = null;
            }
        )
        button2.addEventListener(
            'click',
            () => {
                this.stringQuery = null;
                this.statusQuery = 'all';
                this.render();
            }
        )
        button3.addEventListener(
            'click',
            () => {
                this.stringQuery = null;
                this.statusQuery = true;
                this.render();
            }
        )
        button4.addEventListener(
            'click',
            () => {
                this.stringQuery = null;
                this.statusQuery = false;
                this.render();
            }
        )

        div.appendChild(input);
        div.appendChild(button1);
        div.appendChild(button2);
        div.appendChild(button3);
        div.appendChild(button4);
        this.container.appendChild(div);
    }
    examineInputValue (inputValue) {
        if (inputValue) this.stringQuery = input.value;
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
// example list of tasks
tasks = [
    { checked: false, text: "Buy groceries" },
    { checked: true, text: "Walk the dog" },
    { checked: false, text: "Read a book" }
];

// Set up event listeners and load initial tasks
document.addEventListener('DOMContentLoaded', (event) => {
        
    // Load initial tasks
    tasks.forEach(task => {
        createTaskItem(task.checked, task.text);
    });

    // Event listener for blur event on task category input
    for (let task of document.getElementsByClassName('task-category')) {
        task.addEventListener('focusout', e => {
            const { target } = e;
            if (target.matches('.taskItem')) {
                if (target.value.trim() !== '') {
                    addTask(target);
                    createTaskItem();
                }
            }
        });
    }
});

// Function to handle adding a new task
function addTask(taskItem) {
    const newTaskInput = taskItem.value.trim();
    if (newTaskInput !== '') {
        // Logic to add the new task to the list
        localStorage.setItem("task", newTaskInput);
    }
}

// Function to create a new task item element
function createTaskItem(checked = false, taskText = "") {
    // Outer row
    const form = document.getElementById("task-form");
    const row = document.createElement("div");
    row.className = "row align-items-center mb-3";

    // Checkbox column
    const colAuto = document.createElement("div");
    colAuto.className = "col-auto";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input completeTask";
    checkbox.checked = checked;

    colAuto.appendChild(checkbox);

    // Input column
    const col = document.createElement("div");
    col.className = "col";

    const input = document.createElement("input");
    input.type = "text";
    input.className = "form-control taskItem newTask";
    input.placeholder = "NextUP, this task!";
    input.value = taskText;

    col.appendChild(input);

    // Assemble row
    row.appendChild(colAuto);
    row.appendChild(col);

    // Append to form
    form.appendChild(row);
    row.querySelector('.taskItem').focus();
    return;
}

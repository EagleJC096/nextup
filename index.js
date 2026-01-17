// example list of tasks
tasks = [
    { checked: false, text: "Buy groceries" },
    { checked: true, text: "Walk the dog" },
    { checked: false, text: "Read a book" }
];

let taskState = {
    tasks: [
        {
            id: crypto.randomUUID(),
            categoryId: "inbox",
            description: "Buy milk",
            completed: false,
            createdAt: new Date().toISOString()
        },
        {
            id: crypto.randomUUID(),
            categoryId: "school",
            description: "Finish math homework",
            completed: false,
            createdAt: new Date().toISOString()
        }
    ],
    categories: [
        { id: "inbox", name: "Inbox" },
        { id: "school", name: "School" }
    ]
};

// Set up event listeners and load initial tasks
document.addEventListener('DOMContentLoaded', (event) => {
        
    // Load initial tasks
    tasks.forEach(task => {
        createTaskItem(task.checked, task.text);
    });

    // Event listener for blur event on task category input
    // const taskItems = document.getElementsByClassName('taskItem');
    // for (let i = 0; i < taskItems.length; i++) {
    //     addNewTaskListener(taskItems[i]);
    // }
});

function addNewTaskListener(task) {
    task.addEventListener('blur', e => {
        const valueOfTaskItem = task.value;
        if (valueOfTaskItem.trim() !== '') {
            const taskItems = document.getElementsByClassName('taskItem');
            for (let i = 0; i < taskItems.length; i++) {
                if (taskItems[i].value.trim() === '') {
                    // If there's an empty task item, do not add a new one
                    return;
                }
            }
            addTask(valueOfTaskItem.trim());
            createTaskItem();
        }
    });
}


// Function to handle adding a new task
function addTask(taskItem) {
    const newTaskInput = taskItem;
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
    addNewTaskListener(input);

    col.appendChild(input);

    // Assemble row
    row.appendChild(colAuto);
    row.appendChild(col);

    // Append to form
    form.appendChild(row);
    row.querySelector('.taskItem').focus();
    return;
}


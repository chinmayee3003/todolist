document.addEventListener('DOMContentLoaded', () => {

    const inp = document.getElementById("todoinput");
    const button = document.getElementById("todobtn");
    const list = document.getElementById("todolist");

    // Load tasks
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => renderTask(task));  // call renderTask for each saved task

    // ✅ function to render one task
    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-60 ">Delete</button>
        `;
        list.appendChild(li);

        // delete button functionality
        li.querySelector(".delete-btn").addEventListener("click", () => {
            tasks = tasks.filter(t => t.id !== task.id);  // remove from array
            saveTask();
            li.remove();  // remove from UI
        });
    }

    //  when add button clicked
    button.addEventListener("click", () => {
        const taskText = inp.value.trim();
        if (taskText === "") return;
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false,
        };
        tasks.push(newTask);
        renderTask(newTask);  
        saveTask();           
        inp.value = "";
    });

    
    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});

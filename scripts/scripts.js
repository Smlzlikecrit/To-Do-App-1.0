
// document.addEventListener("load", onload);
let taskArray = []
let editId = null

//local storage functions
function store(){
    localStorage.setItem("tasks", JSON.stringify(taskArray))
}
function retrieve(){
    taskArray = JSON.parse(localStorage.getItem("tasks"))
}

function render(){
    //clearing list
    const ulName = document.getElementById("task-list");
    ulName.innerHTML = ""
    //populate list
    taskArray = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < taskArray.length; i++) {
        const newListItem = document.createElement("li");
        
        newListItem.setAttribute("class", "list-item")
        // create incrementing ID for each task in above data variable
        newListItem.setAttribute("id", i)
        // append all objects to <UL>: const list = document.getElementById("task-list");
        // create all list items 
        const spans = document.createElement("span");
        spans.setAttribute("class", "icons")
        const checkIcon = document.createElement("i");
        checkIcon.setAttribute("class", "far fa-check-circle icon-spacing")
        const editIcon = document.createElement("i");
        editIcon.setAttribute("class", "fas fa-edit icon-spacing")
        const deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "fas fa-trash-alt icon-spacing")
        //appending icons
        spans.appendChild(checkIcon);
        spans.appendChild(editIcon);
        spans.appendChild(deleteIcon);
        //add span of icons to new list item
        newListItem.appendChild(spans)
        
        //add new list item to main list
        const listOfTasks = document.getElementById('task-list');
        listOfTasks.appendChild(newListItem);

        //populate new <li> 
        document.getElementById(i).innerHTML = taskArray[i].name 
    }
}


// ADDTASK FUNCTION
document.getElementById("add-task-button").addEventListener("click", addTask)
function addTask(e){
    e.preventDefault();

    if(document.getElementById("task-name").value != "" && document.getElementById("due-date").value != ""){
    //List creation
    // console.log(document.getElementById('task-list').childElementCount)
        if(document.getElementById('task-list').childElementCount <=8 ){

            const list = document.getElementById("task-list");

            //list item creation
            const newListItem = document.createElement("li");
            
            //setting element class
            newListItem.setAttribute("class", "list-item")
            let taskName = document.getElementById("task-name").value;
            let taskDueDate = document.getElementById("due-date").value;
            //auto incrementing ID
            let taskId = taskArray.length+1
            //saving input into object
            let taskObj = {
                name: taskName,
                dueDate: taskDueDate,
                id: taskId
            }

            //pushing object into global array
            taskArray.push(taskObj);

            taskName = document.createTextNode(taskName);
            // taskDueDate = document.createTextNode(taskDueDate)

            newListItem.appendChild(taskName);
            // newListItem.appendChild(taskDueDate);

            //Creating Spans/icons + setting class to names
            const spans = document.createElement("span");
            spans.setAttribute("class", "icons")
            const checkIcon = document.createElement("i");
            checkIcon.setAttribute("class", "far fa-check-circle icon-spacing")
            const editIcon = document.createElement("i");
            editIcon.setAttribute("class", "fas fa-edit icon-spacing")
            const deleteIcon = document.createElement("i");
            deleteIcon.setAttribute("class", "fas fa-trash-alt icon-spacing")

            //appending icons
            spans.appendChild(checkIcon);
            spans.appendChild(editIcon);
            spans.appendChild(deleteIcon);

            //add span of icons to new list item
            newListItem.appendChild(spans)

            //add new list item to main list
            list.appendChild(newListItem);

            //saving taskArray data to localStorage
            localStorage.setItem("tasks", JSON.stringify(taskArray));

            //setting clearing input blocks
            document.getElementById("task-name").value = "";
            document.getElementById("due-date").value = "";

        } else {
            document.getElementById("task-name").disabled = true;
        }
    }
    completed()
    edit()
    assignRemoveButton()
    store()
}


// COMPLETED FUNCTION - Check circle
function completed() {
    document.querySelectorAll('.fa-check-circle').forEach(btn => {
        btn.addEventListener("click", function(){
            //getting parents of clicked item
            let item = this.parentNode.parentNode
            item.style.textDecoration = "line-through"
        });
    });
}

//Updating event listener of Add Task Button
function updateEventListener(){
    console.log("WORKING")
    const newTaskName = document.getElementById("task-name").value
    const newTaskDate = document.getElementById("due-date").value
    for(i = 0; i < taskArray.length; i++){
        if(editId == taskArray[i].id){
            taskArray[i].name = newTaskName
            taskArray[i].dueDate = newTaskDate
            console.log("values updated")
            console.log(taskArray)
        }
    }
    //updating list for user
    //insert render*() here
    store()
    //removing update eventlistener from add task button
    const removeUpdateListener = document.getElementById("add-task-button")
    removeUpdateListener.removeEventListener("click", updateEventListener)
    //reassigning addTask() to add task button
    const newAddTaskListener = document.getElementById("add-task-button")
    newAddTaskListener.addEventListener("click", addTask)
    newAddTaskListener.value = "Add Task"
    document.getElementById("task-name").value = "";
    document.getElementById("due-date").value = "";
    
}

// EDIT FUNCTION
function edit() {
    document.querySelectorAll('.fa-edit').forEach(btn => {
        btn.addEventListener("click", function(){
            //getting parents of clicked item
            let item = this.parentNode.parentNode
            //populating input fields
            
            for(i = 0; i < taskArray.length; i++){
                if(taskArray[i].name == item.textContent){
                    document.getElementById("task-name").value = taskArray[i].name
                    document.getElementById("due-date").value = taskArray[i].dueDate
                    editId = taskArray[i].id
                }
            }
            //changing event listener of Add Task Button temporarily.removing addTask() eventlistener from add task button
            const removeListenerAddButton = document.getElementById("add-task-button")
            removeListenerAddButton.removeEventListener("click", addTask)
            //assigning updateEventListener() to add task button
            const newListenerButton = document.getElementById("add-task-button")
            newListenerButton.addEventListener("click", updateEventListener)

            newListenerButton.value = "Update Task"
        });
    });
   
}


//DELETE FUNCTION
function assignRemoveButton() {
    document.querySelectorAll('.fa-trash-alt').forEach(btn => {
        btn.addEventListener("click", function(){
            const selectedItem = this.parentNode.parentNode
            console.log(selectedItem.textContent)
            
            for(i = 0; i < taskArray.length; i++){
                if(taskArray[i].name == selectedItem.textContent){
                    const index = taskArray.indexOf(taskArray[i])
                    taskArray.splice(index, 1)
                    const removeableItem = document.getElementById("task-list")
                    removeableItem.removeChild(selectedItem)
                    console.log(taskArray)
                    localStorage.setItem("tasks", JSON.stringify(taskArray))                   
                } else {
                    console.log("error")  
                }
            }
            
            });
        });
}

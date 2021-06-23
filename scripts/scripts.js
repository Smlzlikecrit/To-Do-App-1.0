
document.addEventListener("load", onload);
let taskArray = []

function render(){
    taskArray = JSON.parse(localStorage.getItem("tasks"));
    for (let i = 0; i < taskArray.length; i++) {
        const newListItem = document.createElement("li");
        
        newListItem.setAttribute("class", "list-item")
        // create incrementing ID for each task in above data variable
        newListItem.setAttribute("id", i)
        // append all objects to <UL>: const list = document.getElementById("task-list");
        // create all list items 
        console.log("rendered task: " + taskArray[i].id)
        const spans = document.createElement("span");
        spans.setAttribute("class", "icons")
        const checkIcon = document.createElement("i");
        checkIcon.setAttribute("class", "far fa-check-circle")
        const editIcon = document.createElement("i");
        editIcon.setAttribute("class", "fas fa-edit")
        const deleteIcon = document.createElement("i");
        deleteIcon.setAttribute("class", "fas fa-trash-alt")
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
            checkIcon.setAttribute("class", "far fa-check-circle")
            const editIcon = document.createElement("i");
            editIcon.setAttribute("class", "fas fa-edit")
            const deleteIcon = document.createElement("i");
            deleteIcon.setAttribute("class", "fas fa-trash-alt")

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
    remove()
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


// EDIT FUNCTION

function edit() {
    document.querySelectorAll('.fa-edit').forEach(btn => {
        btn.addEventListener("click", function(){
            //getting parents of clicked item
            let item = this.parentNode.parentNode
            console.log(item.value)
            //populating input fields
            document.getElementById("task-name").value = item.textContent
            document.getElementById("due-date").value = "2021-06-24"

            //test below getting values through saved array (safer + get due date):

            // if(id == id){
            //     splice
            // loop through array to find object with same itemId
            // for(let i = 0; i < taskArray.length; i++){
            //     if(taskArray[i].id == clickedItemId){
            //         document.getElementById("task-name").innerHTML = taskArray[i].taskName
            //         document.getElementById("due-date").innerHTML = taskArray[i].taskDueDate
            //     };
            // }         
        });
    });
}

//in EDIT():
//change CLear Button to Cancel
//Add task to - save?
//run render()

//DELETE FUNCTION
function remove() {
document.querySelectorAll('.fa-trash-alt').forEach(btn => {
    btn.addEventListener("click", function(){
        let item = this.parentNode.parentNode
        console.log(item)
        //get item.id
        //loop through array for same id; taskArray[i].id == item.id
        //remove object from taskArray
        //save()
        });
    });
}


function onload(){
    render()
    completed()
    edit()
    remove()
}

//LOCAL STORAGE FUNCTIONs
// function store(){
//     localStorage.setItem("tasks", JSON.stringify(taskArray))
// }
// function retrieve(){
//     taskArray = JSON.parse(localStorage.getItem("tasks"))
// }
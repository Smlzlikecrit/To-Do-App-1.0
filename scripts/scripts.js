
document.addEventListener("load", render);
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

    if(document.getElementById("task-name").value != ""){
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

            //saving input into object
            let taskObj = {
                name: taskName,
                dueDate: taskDueDate,
                // id: x
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
            //populating input fields
            document.getElementById("task-name").value = item.textContent


            //test below getting values through saved array (safer + get due date):

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

document.querySelectorAll('.fa-trash-alt').forEach(btn => {
    btn.addEventListener("click", remove)
});
function remove(){
    let item = this.parentNode.parentNode
    //get item.id
    //loop through array for same id; taskArray[i].id == item.id
    //remove object from taskArray
    //save()
}
function deleteTask(){
    let iconContainer = document.getElementById("fa-trash-alt").parentNode;
    let x = document.getElementById("myLI").parentNode.nodeName;
    let parent = iconContainer.parentNode;
    console.log(parent)
}



//LOCAL STORAGE FUNCTIONs
function store(){
    localStorage.setItem("tasks", taskArray)
}
function retrieve(){
    taskArray = localStorage.getItem("tasks")
}
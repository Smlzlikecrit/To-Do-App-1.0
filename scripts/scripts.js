// to do: 
// 1. completed icon function
// 2. edit function 
// 3. delete function 
// 4. render function
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


function deleteTask(){
    let iconContainer = document.getElementById("fa-trash-alt").parentNode;
    var x = document.getElementById("myLI").parentNode.nodeName;
    let parent = iconContainer.parentNode;
    console.log(parent)
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
}


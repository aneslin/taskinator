var taskIdCounter = 0;
var formEl = document.querySelector("#task-form"); 
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content"); 
var tasks = []
var taskFormHandler = function(event) { 
  event.preventDefault(); 

  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form")
        return false
    };
  formEl.reset();
  
  var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
    };
    createTaskE1(taskDataObj);
  }; 


var createTaskE1 = function(taskDataObj){
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item"; 
    listItemEl.setAttribute("data-task-id", taskIdCounter)
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    
    console.log(taskDataObj);
console.log(taskDataObj.status);
    
    listItemEl.appendChild(taskInfoEl);
    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsE1);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj)
    tasksToDoEl.appendChild(listItemEl); 
    taskIdCounter++

};


var createTaskActions = function(taskId){
    var actionContainerE1 = document.createElement("div");
    actionContainerE1.className = "task-actions";
    
    var editButtonE1 = document.createElement("button");
    editButtonE1.textContent="Edit";
    editButtonE1.className = 'btn edit-btn';
    editButtonE1.setAttribute("data-task-id", taskId);

actionContainerE1.appendChild(editButtonE1);

    var deleteButtonE1 = document.createElement("button");
    deleteButtonE1.textContent= "Delete";
    deleteButtonE1.className = "btn delete-btn";
    deleteButtonE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(deleteButtonE1);

    var statusSelectE1 = document.createElement("select");
    statusSelectE1.className = "select-status";
    statusSelectE1.setAttribute("name", "status-change");
    statusSelectE1.setAttribute("data-task-id", taskId);

    actionContainerE1.appendChild(statusSelectE1);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++){
        var statusOptionE1 = document.createElement("option");
        statusOptionE1.textContent= statusChoices[i];
        statusOptionE1.setAttribute("value", statusChoices[i]);
        statusSelectE1.appendChild(statusOptionE1);
    }

    return actionContainerE1
}

var deleteTask = function(taskId){
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.remove();
}

var editTask = function(taskId){
  console.log("editing task #"+ taskId);
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  formEl.setAttribute("data-task-id", taskId)
 

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType)
  document.querySelector("input[name='task-name']").value=taskName;
  document.querySelector("select[name='task-type']").value=taskType;
}

var taskButtonHandler = function(event){
  var targetEl = (event.target);
  if (targetEl.matches(".edit-btn")){
    var taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  else if (event.target.matches(".delete-btn")){
    var taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId);
  };
}


  formEl.addEventListener("submit", taskFormHandler);
  pageContentEl.addEventListener("click", taskButtonHandler);




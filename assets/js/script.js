var taskIdCounter = 0;
var formEl = document.querySelector("#task-form"); 
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content"); 
var tasks = []
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector('#tasks-completed')

var completeEditTask = function(taskName, taskType, taskId){
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  for (var i = 0 ; i , tasks.length; i++){
    if (tasks[i].id === parseInt(taskId) ){
      tasks[i].name = taskName;
      tasks[i].type = taskType;
    }
  }
saveTask()

  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

// set new values
taskSelected.querySelector("h3.task-name").textContent = taskName;
taskSelected.querySelector("span.task-type").textContent = taskType;

alert("Task Updated!");
formEl.removeAttribute("data-task-id");
document.querySelector("#save-task").textContent = "Add task"
};




var taskFormHandler = function(event) { 
  event.preventDefault(); 
  var taskNameInput = document.querySelector("input[name='task-name']").value;
  var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form")
        return false
    };
  formEl.reset();
  
  var isEdit = formEl.hasAttribute("data-task-id");
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } 
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput,
      status:"to do"
    };
  
    createTaskEl(taskDataObj); }

  }
    


var createTaskEl = function(taskDataObj){
    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIdCounter)
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
 
    
    listItemEl.appendChild(taskInfoEl);
    var taskActionsE1 = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsE1);
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj)
    tasksToDoEl.appendChild(listItemEl);
   
 saveTasks()
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

  var updatedTasArr = [];
  for (var i = o; i < tasks.length; i++){
    if (tasks[i].id !== parseInt(taskId)){
      updatedTasArr.push(task[i]);
    }
  }
  tasks = updatedTasArr;
  saveTasks()
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
};

var taskStatusChangeHandler = function(event) {
  var taskId = event.target.getAttribute("data-task-id");

  var statusValue = event.target.value.toLowerCase();

var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do"){
    tasksToDoEl.appendChild(taskSelected);
  }
  else if (statusValue ===  "in progress"){
    tasksInProgressEl.appendChild(taskSelected);
  }

  else if (statusValue === "completed"){
    tasksCompletedEl.appendChild(taskSelected);
}

for (var i =0 ; i < tasks.length; i++){
  if(tasks[i].id === parseInt(taskId)){
    tasks[i].status = statusValue;
  
  }
}

saveTasks()
};

var saveTasks = function(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadTasks = function(){
  tasks = localStorage.getItem("tasks")

  if (!tasks){
    tasks = []
    return false
  };
tasks = JSON.parse(tasks);


for(i=0; i < tasks.length; i ++){
  tasks[i].id = taskIdCounter
 
  taskIdCounter++ 
  var listItemEl = document.createElement('li');
  listItemEl.className = "task-item"
  listItemEl.setAttribute("data-task-id", tasks[i].id)
taskInfoEl = document.createElement("div");
taskInfoEl.className= "task-info";
taskInfoEl.innerHTML = "<h3 class = 'task-name' >" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";
listItemEl.appendChild(taskInfoEl)
taskActionsE1 = createTaskActions(tasks[i].id)
listItemEl.appendChild(taskActionsE1)

if (tasks[i].status == "to do"){
  listItemEl.querySelector("select[name='status-change']").selectedIndex = 0
  tasksToDoEl.appendChild(listItemEl)
}
else if (tasks[i].status == "in progress"){
  listItemEl.querySelector("select[name='status-change']").selectedIndex = 1
  tasksInProgressEl.appendChild(listItemEl)
}
else if (tasks[i].status == "completed"){
  listItemEl.querySelector("select[name='status-change']").selectedIndex = 2
  tasksCompletedEl.appendChild(listItemEl)}
  taskIdCounter++
  console.log(listItemEl)
}
}
  formEl.addEventListener("submit", taskFormHandler);
  pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);
loadTasks()

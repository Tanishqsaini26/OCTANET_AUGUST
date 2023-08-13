document.addEventListener("DOMContentLoaded", function() {
    var taskInput = document.getElementById("inputBx");
    var prioritySelect = document.getElementById("selectPriority");
    var addTaskButton = document.getElementById("addTaskButton");
    var taskList = document.getElementById("List");
  
    addTaskButton.addEventListener("click", function() {
      var task = taskInput.value.trim();
      var priority = prioritySelect.value;
      if (task !== "") {
        addTask(task, priority);
        taskInput.value = "";
      }
    });
  
    taskList.addEventListener("click", function(event) {
      if (event.target.tagName === "BUTTON") {
        var li = event.target.parentNode;
        removeTask(li);
      }
    });
  
    
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(function(task) {
      addTask(task.task, task.priority);
    });
  
    function addTask(task, priority) {
      var li = document.createElement("li");
      li.className = "priority-" + priority;
      var spanPriority = document.createElement("span");
      spanPriority.className = "priority";
      spanPriority.textContent = priority.charAt(0).toUpperCase() + priority.slice(1);
      li.appendChild(spanPriority);
  
      var spanTask = document.createElement("span");
      spanTask.textContent = task;
      li.appendChild(spanTask);
  
      var deleteButton = document.createElement("button");
      deleteButton.appendChild(document.createTextNode("Delete"));
      li.appendChild(deleteButton);
  
      taskList.appendChild(li);
  
      
      tasks.push({ task: task, priority: priority });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    function removeTask(li) {
      var task = li.childNodes[1].textContent;
      var priority = li.className.replace("priority-", "");
      var index = findTaskIndex(task, priority);
      if (index !== -1) {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
      li.remove();
    }
  
    function findTaskIndex(task, priority) {
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].task === task && tasks[i].priority === priority) {
          return i;
        }
      }
      return -1;
    }
  });
  
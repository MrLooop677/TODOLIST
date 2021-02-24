// Setting Up Variables
let theInput = document.querySelector(".add-task input"),
  theAddButton = document.querySelector(".add-task .plus"),
  tasksContainer = document.querySelector(".task-content"),
  tasksCount = document.querySelector(".tasks-count span"),
  tasksCompleted = document.querySelector(".tasks-completed span");

// Focus On Input field
window.onload = () => {
  theInput.focus();
};

// Adding The Task
theAddButton.onclick = function () {
  // Check IF The Tasks IS Exists
  let arr = tasksContainer.children;
  for (let x of arr) {
    if (x.innerHTML.includes(theInput.value)) {
      theInput.value = "";
      swal({
        text: "Tasks IS Exists!",
      });
    }
  }
  // If Input is Empty
  if (theInput.value === "") {
    // its aplugin js Sweet alert
    swal({
      text: "Field Is Empty!",
    });
  } else {
    let noTasksMsg = document.querySelector(".no-tasks-message");

    // Check If Span With No Tasks Message Is Exist
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      // Remove noTasksMsg
      noTasksMsg.remove();
    }

    // Create Main Span
    let mainSpan = document.createElement("span");

    // add class to the Mainspan
    mainSpan.className = "task-box";

    // Craete Text Main Span
    let text = document.createTextNode(theInput.value);

    // add text to Main Span
    mainSpan.appendChild(text);

    // Craet Delete Span Element
    let deleteElement = document.createElement("span");

    // add Class to delete span
    deleteElement.className = "delete";
    //  Craet Text Delete
    let textdelete = document.createTextNode("Delete");

    // add  Text To Delete Span
    deleteElement.appendChild(textdelete);

    // add Delete Span To Main Span
    mainSpan.appendChild(deleteElement);

    // add mainSPan To the Task Content
    tasksContainer.appendChild(mainSpan);

    // Empty The Input
    theInput.value = "";
    // Focus On Field
    theInput.focus();
    calculateTasks();
  }
};

// To Delete Tasks
document.addEventListener("click", function (e) {
  if (e.target.className == "delete") {
    e.target.parentNode.remove();
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }
    calculateTasks();
  }

  // Finish Task
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");
    calculateTasks();
  }

  // To Delete all Tasks
  if (e.target.className == "delete-all") {
    tasksContainer.innerHTML = "";
    if (tasksContainer.childElementCount == 0) {
      createNoTasks();
    }
    calculateTasks();
  }

  // Finish All Tasks
  if (e.target.classList.contains("finished-all")) {
    arr = tasksContainer.children;
    for (let x of arr) x.classList.toggle("finished");
    calculateTasks();
  }
});

function createNoTasks() {
  // Create Message Span Element
  let msgSpan = document.createElement("span");

  // Create The Text Message
  let msgText = document.createTextNode("No Tasks To Show");

  // Add Text To Message Span Element
  msgSpan.appendChild(msgText);

  // Add Class To Message Span
  msgSpan.className = "no-tasks-message";

  // Append The Message Span Element To The Task Container
  tasksContainer.appendChild(msgSpan);
}

// Function To Calculate Tasks
function calculateTasks() {
  // Calculate All Tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".task-content .task-box"
  ).length;

  // Calculate Completed Tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".task-content .finished"
  ).length;
}

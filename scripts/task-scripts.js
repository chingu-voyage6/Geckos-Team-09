// Coded by Dezmond Huston
var taskForm = document.querySelector('.task-form');
var toDoElement = document.querySelector(".style-to-do");
var elementList, divNameID, nodeValue, node;
var unorderedStorageArr = [];
var orderedStorageArr = [];
var count = 0;


// Run onload
window.onload = function(){




// Check if localStorage exists
if(localStorage.getItem(localStorage.key(0)) !== null){


  // Push localStorage values to unorderedStorageArr
  for(var i = 0; i < localStorage.length; i++){
    unorderedStorageArr.push([localStorage.key(i), localStorage.getItem(localStorage.key(i))]);
  }

  // Put Sorted Array values into orderedStorageArr
  orderedStorageArr = unorderedStorageArr.sort(comparison);



  // Repopulate tasks onload
  for(var i = 0; i < orderedStorageArr.length; i++){

      nodeValue = orderedStorageArr[i][1];
      divNameID = orderedStorageArr[i][0];
      addTask(nodeValue, divNameID);
  }






  // Change count to prevent count from being overwritten
  var tempCountArr = orderedStorageArr[orderedStorageArr.length - 1][0].split("-");
  var tempCount = parseInt(tempCountArr[tempCountArr.length - 1]);
  count = tempCount + 1;
} else{
  return;

}

};

// Listens for a form submission
taskForm.addEventListener("submit", function(event){
  // Prevents default action of reloading the page
  event.preventDefault();

  nodeValue = taskForm[0].value;
  //node = document.createTextNode(nodeValue);
  divNameID = "myDiv-name-" + count;

  addTask(nodeValue, divNameID);
  addLocalStorage(nodeValue, divNameID);

});


// Delete element after the delete button is clicked
toDoElement.addEventListener("click", function(event){
  var target = event.target;

  // Stops it from deleting anything other than the style-task-delete parent
  if(target.className == "style-task-delete"){

    // Remove entire div belonging to the target "Delete" button
    target.parentElement.remove();

    //
    localStorage.removeItem(target.parentElement.id);

    // Get all elements that have the correct id
    elementList = document.querySelectorAll("[id^=myDiv-name]");


  } else{
    return;
  }
});


// Adds Task
function addTask(_nodeValue, _divNameID){
  // Remove all empty spaces from the string to test and put paragraph value into nodeValue
  var testStringNoSpaces = _nodeValue.replace(/\s/g, "");

  // Prevent empty strings or strings with only spaces from being submitted
  if (testStringNoSpaces != "") {

    // Create div
    var myDiv = document.createElement("div");

    // Make paragraph and give it the task text as a value
    var para = document.createElement("p");
    node = document.createTextNode(_nodeValue);
    para.appendChild(node);

    // Create Delete button
    var btn = document.createElement("BUTTON");
    var btnNode = document.createTextNode("DELETE");
    btn.appendChild(btnNode);

    // Add class to the paragraph, myDiv, and delete button
    myDiv.classList.add("style-task-div");
    para.classList.add("style-task-paragraph");
    btn.classList.add("style-task-delete");

    // Add id to paragraph
    myDiv.id = _divNameID;

    // Make paragraph and button a child of myDiv
    myDiv.appendChild(para);
    myDiv.appendChild(btn);

    // Make myDiv a child of the div with a class of "style-to-do"
    var element = document.querySelector(".style-to-do");
    element.appendChild(myDiv);

    //increment count
    count++;

  }else{
    return;
  }
}


function addLocalStorage(_nodeValue, _divNameID){

  if(_nodeValue){
    // Make localStorage
    localStorage.setItem(_divNameID, _nodeValue);

    // Clear input field
    taskForm[0].value = "";
  }
}


// Compare values to sort unorderedStorageArr
function comparison(a, b) {

  var c, d;

  // Split divNameID with the "-" symbol into variables c and d
  c = a[0].split("-");
  d = b[0].split("-");

  // Return difference of divNameID number for sorting
  return parseInt(c[c.length - 1]) - parseInt(d[d.length - 1]);

}
// Coded by Dezmond Huston

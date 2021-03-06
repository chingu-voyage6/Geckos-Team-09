var taskForm = document.querySelector('.task-form');
var toDoElement = document.querySelector('.style-to-do');
var checkboxElement = document.querySelector('.style-checkbox');
var elementList, divNameID, nodeValue, node, boolCheck;
var unorderedStorageArr = [];
var orderedStorageArr = [];
var JSONArr = [];
var count = 0;


// Run onload
window.onload = function () {

  var reg = /myDiv-name-\d/;

  // Try if localStorage exists
  try {

    // Push localStorage values to unorderedStorageArr
    for (var i = 0; i < localStorage.length; i++) {
      // Check if key matches reg before adding it to unorderedStorageArr
      if (localStorage.key(i).match(reg)) {
        unorderedStorageArr.push([localStorage.key(i), localStorage.getItem(localStorage.key(i))]);
      }
    }

    // Put Sorted Array values into orderedStorageArr
    orderedStorageArr = unorderedStorageArr.sort(comparison);

    // Repopulate tasks onload
    for (var i = 0; i < orderedStorageArr.length; i++) {

      nodeValue = orderedStorageArr[i][1];
      divNameID = orderedStorageArr[i][0];
      addTask(nodeValue, divNameID);
    }






    // Change count to prevent count from being overwritten
    var tempCountArr = orderedStorageArr[orderedStorageArr.length - 1][0].split("-");
    var tempCount = parseInt(tempCountArr[tempCountArr.length - 1]);
    count = tempCount + 1;
  }
  catch{
    return;
  }

};

// Listens for a form submission
taskForm.addEventListener("submit", function (event) {
  // Prevents default action of reloading the page
  event.preventDefault();

  var target = event.target;

  if(target.className == "task-form"){
    // Create bool for checkbox as false
    boolCheck = false;

    // Assign text and bool values to nodeValue
    JSONArr.push(taskForm[0].value);
    JSONArr.push(boolCheck);
    nodeValue = JSON.stringify(JSONArr);

    divNameID = "myDiv-name-" + count;

    addTask(nodeValue, divNameID);
    addLocalStorage(nodeValue, divNameID);

    // Clear JSONArr value
    JSONArr = [];
  } else {
    return;
  }
});


// Delete element after the delete button is clicked
toDoElement.addEventListener("click", function (event) {
  var target = event.target;

  console.log(target.className);
  // Stops it from deleting anything other than the style-task-delete parent
  //if (target.className == "style-task-delete" && target.className == "trash-can-style") {
  if (target.classList.contains("style-task-delete")) {


    // Remove entire div belonging to the target "Delete" button
    if (node.parentElement) {
      target.parentElement.classList.toggle("removeAnime");
      setTimeout(() => target.parentElement.remove(), 1000);
    }
    // Remove the task from localStorage as well
    localStorage.removeItem(target.parentElement.id);

    // Get all elements that have the correct id
    elementList = document.querySelectorAll("[id^=myDiv-name]");


  } else {
    return;
  }
});



// Update boolCheck when checkbox is clicked
toDoElement.addEventListener("click", function (event) {

  var target = event.target;

  // Check if checkbox was clicked
  if (target.className == "style-checkbox") {

    // Get localStorage id and value, and change the value of boolCheck
    var myDivName = target.parentElement.id;
    var myLocalJSON = JSON.parse(localStorage.getItem(myDivName));
    boolCheck = target.checked;

    myLocalJSON[1] = boolCheck;

    var myNodeValue = JSON.stringify(myLocalJSON);


    // Update localStorage with new boolCheck value
    localStorage.setItem(myDivName, myNodeValue);


    // Add and Remove strikethrough class when checkbox is checked and unchecked
    if (target.checked === true) {
      addClass(target.nextElementSibling, "strikethrough");
    } else {
      if (target.nextElementSibling.classList.contains("strikethrough")) {
        // Remove strike if checkbox is clicked and it already has a strike
        removeClass(target.nextElementSibling, "strikethrough");
      } else {
        return;
      }
    }
  } else {
    return;
  }

});



// Adds Task
function addTask(_nodeValue, _divNameID) {

  // Turn _nodeValue into JSON array
  _nodeValue = JSON.parse(_nodeValue);

  // Remove all empty spaces from the string to test and put paragraph value into nodeValue
  var testStringNoSpaces = _nodeValue[0].replace(/\s/g, "");

  // Prevent empty strings or strings with only spaces from being submitted
  if (testStringNoSpaces != "") {

    // Create div
    var myDiv = document.createElement("div");


    // Make checkbox
    var myCheck = document.createElement("INPUT");
    myCheck.setAttribute("type", "checkbox");

    // Make checkbox value change to the value it has saved
    if (_nodeValue[1]) {
      myCheck.checked = nodeValue[1];
    } else {
      myCheck.checked = boolCheck;
    }

    // Make paragraph and give it the task text as a value
    var para = document.createElement("p");
    node = document.createTextNode(_nodeValue[0]);
    para.appendChild(node);

    // Create Delete button
    var btn = document.createElement("BUTTON");
    var btnNode = document.createTextNode("");
    btn.appendChild(btnNode);

    // Create span for trash and Checkbox
    var trashSpan = document.createElement("SPAN");
    //var checkSpan = document.createElement("SPAN");

    // Append span to BUTTON
    btn.appendChild(trashSpan);



    // Add class to the paragraph, myDiv, and delete button
    myDiv.classList.add("style-task-div");
    myCheck.classList.add("style-checkbox");
    para.classList.add("style-task-paragraph");
    btn.classList.add("style-task-delete");
    btn.classList.add("trash-can-style");
    trashSpan.classList.add("far");
    trashSpan.classList.add("fa-trash-alt");
    //checkSpan.classList.add("checkmark");


    // Add id to paragraph
    myDiv.id = _divNameID;

    // Make paragraph, checkbox, and button a child of myDiv
    myDiv.appendChild(myCheck);
    //myDiv.appendChild(checkSpan);
    myDiv.appendChild(para);
    myDiv.appendChild(btn);

    // Make myDiv a child of the div with a class of "style-to-do"
    var element = document.querySelector(".style-to-do");
    element.appendChild(myDiv);

    // Verify Checkbox is checked
    if (myCheck.checked === true) {
      // Redo strikethrough on page load
      addClass(myCheck.nextElementSibling, "strikethrough");
    }

    //increment count
    count++;

  } else {
    return;
  }
}


// Clears Search bar
function clearSearchBar(){
  var inputElement = document.querySelector(".search-input-style");
  if(inputElement.value != ""){
    inputElement.value = ""; // Clears Search box
    inputElement.blur(); // Removes the cursor
} else {
  return;
}

}

// Timeout called onsubmit
function myTimeoutFunc(){
  // Calls clearSearchBar after 3 seconds
  var myTimeout = setTimeout(clearSearchBar, 3000);
}



function addLocalStorage(_nodeValue, _divNameID){

  // Temp JSON holder
  var myJSON = JSON.parse(_nodeValue);

  // Check if localStorage has value after removing spaces
  if (myJSON[0].replace(/\s/g, "")) {
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

// Function to more easily add classes
function addClass(classElement, myClassName) {
  classElement.classList.add(myClassName);
}

// Function to more easily remove classes
function removeClass(classElement, myClassName) {
  classElement.classList.remove(myClassName);
}

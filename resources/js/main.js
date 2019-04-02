const toDoItemsArray = [
  {name: 'Walk the dog', priority:2},
  {name: 'Water the plants', priority:3},
  {name: 'Book a table', priority:3},
  {name: 'Buy new sneakers', priority:1},
  {name: 'Clean the kitchen', priority:1}
];

const completedItemsArray = [];

// Set up some variables for the elements on the page
const toDoList = document.getElementById('toDo');
const completedItems = document.getElementById('completedItems');
const markAllButton = document.getElementById('mark-all');
const removeAllButton = document.getElementById('mark-all');
const userInput = document.getElementById('item'); 
const priorityInput = document.getElementById('priority');

window.onload = () => {
  displayItemsFromArray();
}

// grab the user input from the input field 
// display the user input in the list below 

const createListItem = (task) => {
  // create new list item
  const listItem = document.createElement('li');
  // create input with type checkbox
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  // when checkbox changes state, we will invoke markAsDone function
  checkbox.onchange = markAsDone;
  // create label for name of task
  const label = document.createElement('label');
  label.className = 'to-do-item';
  // set text of label to the parameter 'text'
  label.innerHTML = task.name;
  // create label for priority
  const priorityLabel = document.createElement('label');
  priorityLabel.innerHTML = '(' + task.priority + ')';
  priorityLabel.className = 'priority-item';

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(priorityLabel);

  return listItem;
};

const createNewTask = (name, priority) => {
  return {name:name, priority:priority};
}

const addItem = () => {
  if (userInput.value === '') {
    alert('You must write something');
  } else {
    // push a new task object to the array
    const task = createNewTask(userInput.value, priorityInput.value);

    toDoItemsArray.push(task);
    const li = createListItem(task);
    toDoList.appendChild(li);
    setEmptyToDoDisplay('none');
    // clear the input field
    userInput.value = '';
  }
};

const markAsDone = (click) => {
  const item = click.target.parentElement;
  // change behavior of clicking on the checkbox 
  click.target.onchange = markAsUndone;
  removeItem(item);
  // now add the item to the completed list
  completedItems.appendChild(item);
  if (checkIfToDoIsEmpty()) {
    setEmptyToDoDisplay('block');
  }
  // looking for the label element and retrieving the name of the task
  const textContent = item.querySelector('label').textContent;
  // loop through the array to find the name of the task
  // so we can remove it from the toDoItemsArray and push to the completedItems array
  for (let i = 0; i < toDoItemsArray.length; i++) {
    if (toDoItemsArray[i].name === textContent) {
      // since splice returns an array, we ask for the first value of the array only
      const completedItem = toDoItemsArray.splice(i, 1)[0];
      completedItemsArray.push(completedItem);
      break;
    }
  }
};

const markAsUndone = (click) => {
  const item = click.target.parentElement;

  // looking for the label element and retrieving the name of the task
  const textContent = item.querySelector('label').textContent;
  // loop through the array to find the name of the task
  // so we can remove from the toDoItemsArray and push to the completedItems array
  for (let i = 0; i < completedItemsArray.length; i++) {
    if (completedItemsArray[i].name === textContent) {
      // since splice returns an array, we ask for the first value of the array only
      const toDoItem = completedItemsArray.splice(i, 1)[0];
      toDoItemsArray.push(toDoItem);
      break;
    }
  }

  // change behavior of clicking on the checkbox 
  click.target.onchange = markAsDone;
  removeItem(item);

  if (checkIfToDoIsEmpty()) {
    setEmptyToDoDisplay('none');
  }

  // add the item to the to do list
  toDoList.appendChild(item);
};

// removeItem will receive an li element in the 'item' parameter.
// the function uses the parent element, which is the 'ul'
// and calls 'removeChild' from the 'ul' parent element
const removeItem = (item) => {
  item.parentElement.removeChild(item);
  return item;
};

const sortByPriority = () => {
  toDoItemsArray.sort(function(task1, task2) {
    return task1.priority - task2.priority;
  });
  // remove and redisplay
  removeAllItems();
  displayItemsFromArray();
};

const displayItemsFromArray = () => {
  toDoItemsArray.forEach(function(task) {
    const li = createListItem(task);
    toDoList.appendChild(li);
  });
};

const removeAllItems = () => {
  while (toDoList.firstChild) {
    toDoList.removeChild(toDoList.firstChild);
  }
};

const clearToDoList = () => {
  removeAllItems();
  // empty the array
  toDoItemsArray.splice(0, toDoItemsArray.length);
  setEmptyToDoDisplay('block');
};

const setEmptyToDoDisplay = (display) => {
  let emptyTodo = document.getElementById('emptyTodo');
  // display should be block or none
  emptyTodo.style.display = display; 
};

const checkIfToDoIsEmpty = () => {
  let isEmpty = toDoList.children.length === 0; 
  return isEmpty;
};

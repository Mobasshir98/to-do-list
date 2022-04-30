const todoinput = document.querySelector(".todoinput");
const todobutton = document.querySelector(".todobtn");
const todolist = document.querySelector(".todolist");
const filteroption = document.querySelector(".filtertodo");

todolist.addEventListener("click", deletecheck);
todobutton.addEventListener("click", addtodo);

filteroption.addEventListener("click", filtertodo);

document.addEventListener("DOMContentLoaded", getvalue);

function addtodo(event) {
  event.preventDefault();
  const tododiv = document.createElement("div");
  tododiv.classList.add("todo");
  const newtodo = document.createElement("li");
  if (todoinput.value === "") {
    alert("Enter items to add");
  } else {
    newtodo.innerText = todoinput.value;
    storevalue(todoinput.value);
    newtodo.classList.add("todoitem");
    tododiv.appendChild(newtodo);
    const completedbtn = document.createElement("button");
    completedbtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedbtn.classList.add("completedbtn");
    tododiv.appendChild(completedbtn);
    const trashbtn = document.createElement("button");
    trashbtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashbtn.classList.add("trashbtn");
    tododiv.appendChild(trashbtn);
    todolist.appendChild(tododiv);
    todoinput.value = "";
  }
}
function deletecheck(event) {
  const item = event.target;
  if (item.classList[0] === "trashbtn") {
    item.parentElement.classList.add("fall");
    removevalue(item.parentElement.innerText)
    item.parentElement.addEventListener("transitionend", function () {
      item.parentElement.remove();
    });
  }
  if (item.classList[0] === "completedbtn") {
    storecompleted(item.parentElement.innerText);
    item.parentElement.classList.toggle("completed");
  }
}

function filtertodo(e) {
  const todos = todolist.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function storevalue(todo) {
  let todos=check();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function storecompleted(completedvalue){
  let completed=completecheck();
  if(!completed.includes(completedvalue)){
  completed.push(completedvalue);
  }
  localStorage.setItem("completed", JSON.stringify(completed));
}

function getvalue() {
  let todos=check();
  let completed=completecheck();
  todos.forEach(function (todo) {
    const tododiv = document.createElement("div");
    if(completed.includes(todo)){
      tododiv.classList.toggle("completed");
    }
    tododiv.classList.add("todo");
    const newtodo = document.createElement("li");
    newtodo.innerText = todo;
    newtodo.classList.add("todoitem");
    tododiv.appendChild(newtodo);
    const completedbtn = document.createElement("button");
    completedbtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    completedbtn.classList.add("completedbtn");
    tododiv.appendChild(completedbtn);
    const trashbtn = document.createElement("button");
    trashbtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashbtn.classList.add("trashbtn");
    tododiv.appendChild(trashbtn);
    todolist.appendChild(tododiv);
  });
}

function completecheck(){
  let completed;
  if(localStorage.getItem("completed")===null){
    completed=[];
  }
  else{
    completed=JSON.parse(localStorage.getItem("completed"));
  }
  return completed;
}

function check(){
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
function removevalue(todo){
  let todos=check();
  let index=todos.indexOf(todo);
  todos.splice(index,1);
  localStorage.setItem("todos",JSON.stringify(todos));
  let completed=completecheck();
  let completeindex=completed.indexOf(todo);
  completed.splice(completeindex,1);
  localStorage.setItem("completed", JSON.stringify(completed));
}
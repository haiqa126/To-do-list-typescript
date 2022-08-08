//console.log("hi") -works fine 
import {v4 as uuidV4} from "uuid";


type Task={id:string, 
  title:string,
  completed:boolean,
  createdAt:Date}

const list=document.querySelector<HTMLUListElement>('#list');
const form=document.querySelector<HTMLFormElement>('#new-task-form') as HTMLFormElement |null;
const input=document.querySelector<HTMLInputElement>('#new-task-title');
const tasks:Task[] =loadTasks();
tasks.forEach(addListItem);

form?.addEventListener("submit",e=>{
e.preventDefault();
console.log("form was submitted")

if (input?.value=="" || input?.value==null) return
 const newTask: Task={
  id: uuidV4(),
  title: input.value,
  completed:false,
  createdAt: new Date()

 }
 //console.log("the task is:")
console.log(newTask);

 tasks.push(newTask);
 saveTasks();

addListItem(newTask);
input.value="";

});

//Form submission has ended




function addListItem(task:Task){
 const item=document.createElement("li");
 const label=document.createElement("label");
 const checkbox=document.createElement("input");


 checkbox.addEventListener("change",()=>{
  task.completed=checkbox.checked;
 saveTasks()

  console.log(tasks)
 })

 checkbox.type="checkbox";
 checkbox.checked=task.completed;
 label.append(checkbox, task.title);
 item.append(label);
 list?.appendChild(item);

 

}

function saveTasks(){
  localStorage.setItem("Tasks",JSON.stringify(tasks));
  console.log("task saved to local storage");
}

function loadTasks():Task[]{
const taskJson=localStorage.getItem("Tasks")
if(taskJson==null) return [];
console.log("i loaded the tasks from the local storage");
return JSON.parse(taskJson);



}
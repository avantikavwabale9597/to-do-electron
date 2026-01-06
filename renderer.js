const taskList = document.getElementById('taskList')
function addTask() {
    const input=document.getElementById('taskInput')
    const taskText=input.value.trim()

    if (taskText == ``) return
    const li = document.createElement('li')

    const span = document.createElement('span')
    span.innerText=taskText
    span.onclick=()=>toggleTask(span)

    const button=document.createElement('button')
    button.innerText='Done!!'
    button.className='del'
    button.onclick=()=>deleteTask(button)

    li.appendChild(span)
    li.appendChild(button)
    taskList.appendChild(li)
    input.value=''
    saveTasks()
}

function deleteTask(button){
    button.parentElement.remove()
    saveTasks()
}

function toggleTask(span){
    span.classList.toggle('completed')
    saveTasks()
}

function saveTasks(){
    localStorage.setItem('tasks', taskList.innerHTML)
}

function loadTasks(){
    const tasks=JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks.forEach(task => {
    const li = document.createElement('li')

    const span = document.createElement('span')
    span.innerText = task.text
    if(task.completed) span.classList.add('completed')
    span.onclick=()=>toggleTask(span)

    const button=document.createElement('button')
    button.innerText='Done!!'
    button.className='del'
    button.onclick=()=>deleteTask(button)

    li.appendChild(span)
    li.appendChild(button)
    taskList.appendChild(li)
    })
}
loadTasks()
import React, {useState} from 'react'
import './Todo.css'

export default function Todo(){
    const [alert, setAlert] = useState("idle")
    const [task, setTask] = useState("")
    const [taskList, setTaskList] = useState([])
    function handleSubmit(e){
        e.preventDefault()
        if (task.trim() === ""){
            setAlert("blank")
            return
        }
        const newTask = { id: crypto.randomUUID(), text: task}
        setTaskList(prev=> [...prev, newTask])
        setTask("")
    }
    function handleChange(e){
        setTask(e.target.value)
        setAlert("idle")
    }
    function handleDelete(index){
        const updatedTask= taskList.filter((_,i)=> i !==index)
        setTaskList(updatedTask)
    }
    function moveUp(index){
        const updatedTask = [...taskList]
        if (index > 0){
            [updatedTask[index], updatedTask[index-1]] = [updatedTask[index-1], updatedTask[index]]
            setTaskList(updatedTask)
        }
    }
    function moveDown(index){
        const updatedTask = [...taskList]
        if (index < updatedTask.length - 1){
            [updatedTask[index + 1], updatedTask[index]] = [updatedTask[index], updatedTask[index + 1]] 
            setTaskList(updatedTask)
        }
    }
return(
    <section className="todo_container">
        {alert === "idle" && <h1>Welcome Back!</h1>}
        {alert === "blank" && <span className="alertUser">You need to enter a task!</span>}
        {alert === "duplicate" && <span className="alertUser">That task exist already!</span>}
        <form onSubmit={handleSubmit}>
            <section className="taskGroup">
                <input type="text" name="task" value={task} onChange={handleChange}
                    placeholder="Add task here..." />
                <button>ADD</button>

            </section>
        </form>
        <section className="tasks">
            <ul>
                {taskList.map((task, index) => (
                <li key={task.id}> {task.text}
                    <section className="listBtn">
                        <button type="button" onClick={()=> moveUp(index)}>☝️</button>
                        <button type="button" onClick={()=> moveDown(index)}>👇</button>
                        <button type="button" onClick={()=>handleDelete(index)}>❌</button>
                    </section>
                </li> ))}
            </ul>
        </section>
    </section>
)}
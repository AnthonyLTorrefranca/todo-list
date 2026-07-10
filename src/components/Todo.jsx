import React, { useState } from 'react'
import './Todo.css'

export default function Todo(){
    const [alert, setAlert] = useState("idle");
    const [task, setTask] = useState("")
    const [taskList, setTaskList] = useState([])
    function handleSubmit(e){
        e.preventDefault()
        const newTask = {id: crypto.randomUUID(), text: task.trim()};
        if (newTask.text === ""){
            setAlert("blank")
            return
        } else if (taskList.some(item=> item.text.toLowerCase() === task.trim().toLowerCase())){
            setAlert("duplicate")
            return
        }
        setTaskList(prev=>[...prev, newTask])
        setTask("")
    }
    function handleChange(e){
        setTask(e.target.value)
        setAlert("idle")
    }
    function handleDelete(id){
        const updatedTask = taskList.filter(item=> item.id !== id)
        setTaskList(updatedTask)
    }
    function moveUp(id){
        const updatedTask = [...taskList];
        const index = updatedTask.findIndex(item=> item.id === id);
        if (index > 0){
            [updatedTask[index],updatedTask[index-1]] = [updatedTask[index-1],updatedTask[index]]
            setTaskList(updatedTask)
        }
    }
    function moveDown(id){
        const updatedTask = [...taskList];
        const index = updatedTask.findIndex(item=> item.id === id);
        if (index < taskList.length - 1){
            [updatedTask[index+1], updatedTask[index]] = [updatedTask[index], updatedTask[index+1]]
            setTaskList(updatedTask)
        }
    }
    return (
        <section>
            <form onSubmit={handleSubmit}>
            <section className='todo_container'>
                <section className="alertSection">
                    {alert === "idle" && <h1>Welcome back!</h1>}
                    {alert === "duplicate" && <span className="alertUser">Already exists!</span>}
                    {alert === "blank" && <span className="alertUser">You cannot add task with blank space!</span>}
                </section>
                <section className='taskGroup'>
                    <input type="text" name="task" value={task} onChange={handleChange} placeholder="Enter your task here..." />
                    <button type="submit">ADD</button>
                </section>
                <section className="tasks">
                    <ul>
                        {taskList.map((task,id) => 
                        <li key={task.id}> {task.text}
                            <section className='listBtn'>
                                <button type="button" onClick={()=> moveUp(task.id)}>☝️</button>
                                <button type="button" onClick={()=> moveDown(task.id)}>👇</button>
                                <button type="button" onClick={()=> handleDelete(task.id)}>❌</button>    
                            </section>
                        </li>)}
                    </ul>
                </section>
            </section>
            </form>
        </section>
    )
}
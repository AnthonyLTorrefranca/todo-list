import React, {useState} from 'react'
import './Todo.css'

export default function Todo(){
    const [alert,setAlert] = useState("idle")
    const [task,setTask] = useState("")
    const [taskList, setTaskList] = useState([])

    function handleSubmit(e){
        e.preventDefault()
            // blank
        if (task.trim()===""){
            setAlert("blank")
            return
            // duplicate
        } else if (taskList){
            return
        }
            // unique key ngani
        const newTask = {id: crypto.randomUUID, text: task}
        setTaskList(prev=>[...prev, newTask])
    }
    function handleChange(e){
        setTask(e.target.value)
        setAlert("idle")
    }
    function handleDelete(index){
    }
    function moveUp(index){
        const updatedTask = [...taskList]
        console.log("test up ngani")
    }
    function moveDown(index){
        const updatedTask = [...taskList]
    }
return (<section className='todo_container'>
    <form onSubmit={handleSubmit}>
        {alert === "idle" && <h1>Welcome back!</h1>}
        {alert === "blank" && <span className='alertUser'>Enter valid task!</span>}
        {alert === "duplicate" && <span className='alertUser'>This task already exist!</span>}
        <section className="taskGroup">
            <input type="text" placeholder="Add task..."
                name="task" value={task} onChange={handleChange} />
            <button>ADD</button>
        </section>
        <section className="tasks">
            <ul>
                <section className="listBtn">
                    <button type="button" onClick={()=> moveUp(index)}>☝️</button>
                    <button type="button" onClick={()=> moveDown(index)}>👇</button>
                    <button type="button" onClick={()=>handleDelete(index)}>❌</button>
                </section>
            </ul>
        </section>
    </form>
</section>)}
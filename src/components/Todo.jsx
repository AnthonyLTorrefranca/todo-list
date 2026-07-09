import React, {useState} from 'react'
import './Todo.css'

export default function Todo(){
    const [blank,setBlank] = useState("idle")
    const [task,setTask] = useState("")
    const [taskList, setTaskList] = useState([])

    function handleSubmit(e){
        e.preventDefault()
        if (task.trim() === ""){
            setBlank("")
            return
        }
        console.log(task)
        setTaskList(prev =>[...prev, task])
    }
    function handleChange(e){
        e.preventDefault()
        setTask(e.target.value)
        setBlank("idle")
    }
return (<section className='todo_container'>
    <form onSubmit={handleSubmit}>
        {blank && <h1>Welcome back!</h1>}
        {!blank && <span className='alertUser'>Enter valid task!</span>}
        <section className="taskGroup">
            <input type="text" placeholder="Add task..."
                name="task" onChange={handleChange} />
            <button>ADD</button>
        </section>
        <section className="tasks">
            <ul>
                {taskList.map((task, index)=> <li key={index}> {task}
                    <section className="listBtn">
                        <button type="button">☝️</button>
                        <button type="button">👇</button>
                        <button type="button">❌</button>
                    </section>
                </li>)}
            </ul>
        </section>
    </form>
</section>)}
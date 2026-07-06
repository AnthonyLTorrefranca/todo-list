import React, { useState } from 'react'
import './Todo.css'

export default function Todo() {
  const [blank, setBlank] = useState(false);
  const [task,setTask] = useState("")
  const [taskList,setTaskList] = useState([])
  function handleChange(e){
    setTask(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    if (task.trim() === ""){
      setBlank(true)
      setTimeout(() => {
        setBlank(false)
      }, 2500);
      return
    }
    setTaskList(prev=>[...prev, task])
    setTask("")
  }
  function handleDelete(index){
    const updatedTask = taskList.filter((_,i)=> i !== index);
    setTaskList(updatedTask)
  }
return (
  <>
    <section className='todo_container'>
      <form onSubmit={handleSubmit}>
        <h1>Add your bucketlist:</h1>
        {blank? <span className='alertUser'>You need to enter valid bucketlist</span>: null }
        <section className='taskGroup'>
          <input type="text" placeholder="Enter here"
           value={task} onChange={handleChange} />
          <button type="submit">ADD</button>
        </section>
      </form>
      <section className="tasks">
        <ul>
          {taskList.map((task, index)=>(
            <li key={index}>{task}
            <section className="listBtn">
              <button>👆</button>
              <button>👇</button>
              <button onClick={()=>handleDelete(index)}>❌</button>
            </section>
            </li>
          ))}
        </ul>
      </section>
    </section>
  </>
  )
}

import React, { useState, useEffect } from 'react'
import './Todo.css'

export default function Todo() {
  const [blank, setBlank] = useState({idle: true, input: false})
  const [task, setTask] = useState("")
  const [taskList, setTaskList] = useState([])

  function handleSubmit(e){
    e.preventDefault()
    if (task.trim() === ""){
      setBlank(prev=>({...prev, idle: false, input: true}))
      setTimeout(() => {
        setBlank(prev=>({...prev, idle: true, input: false}))
      }, 1500);
      return
    }
    setTaskList(prev=> [...prev, task])
    setTask("")
  }
  function handleChange(e){
    setTask(e.target.value)
  }
  function handleDelete(index){
    const updatedTask = 
    taskList.filter((_, i) => 
      i !== index
    )
    setTaskList(updatedTask)
  }
  useEffect(()=>{
    console.log(taskList)
  }, [taskList])
return (
  <>
    <section className='todo_container'>
      <form onSubmit={handleSubmit}>
        {blank.idle && <h1>Add your bucketlist:</h1>}
        {blank.input && <span className='alertUser'>You need to enter valid bucketlist</span>}
        <section className='taskGroup'>
          <input type="text" placeholder="Enter here"
            value={task} onChange={handleChange} />
          <button type="submit">ADD</button>
        </section>
      </form>
      <section className="tasks">
        {taskList.map((task, index)=>[
          <li key={index}>{task}
            <section className='listBtn'>
              <button>☝️</button>
              <button>👇</button>
              <button onClick={()=> handleDelete(index)}>❌</button>
            </section>
          </li>
        ])}
      </section>
    </section>
  </>
  )
}
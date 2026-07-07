import React, { useState, useEffect } from 'react'
import './Todo.css'

export default function Todo() {
  const [blank, setBlank] = useState({idle: true, input: false})
  const [task, setTask] = useState("")
  const [taskList, setTaskList] = useState([])

  function handleChange(e){
    setTask(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    if (task.trim() === ""){
      setBlank(prev=>({...prev, idle: false, input: true}))
      setTimeout(() => {
        setBlank(prev=>({...prev, idle: true, input: false}))
      }, 1000);
      return
    }
    setTaskList(prev=>[...prev, task])
    setTask("")
  }
  function handleDelete(index){
    const updatedTasks = taskList.filter((_,i)=> i !== index);
    setTaskList(updatedTasks)
  }
  function moveUp(index){
    const updatedTasks = [...taskList]
    if (index > 0){
      [updatedTasks[index],updatedTasks[index-1]] = [updatedTasks[index-1],updatedTasks[index]]
    }
    setTaskList(updatedTasks)
  }
  function moveDown(index){
    const updatedTasks = [...taskList]
    if (index < taskList.length - 1){
      [updatedTasks[index+1], updatedTasks[index]] = [updatedTasks[index],updatedTasks[index+1]]
    }
    setTaskList(updatedTasks)
  }
  useEffect(()=>{console.log(taskList)},[taskList])
  return (
    <section>
      <form className="todo_container" onSubmit={handleSubmit}>
        {blank.idle && <h1>TO-DO LIST</h1>}
        {blank.input && <span className='alertUser'>Please enter valid task!</span>}
        <section className="taskGroup">
          <input type="text" placeholder="Add your task here:"
            value={task} onChange={handleChange} />
          <button type="submit">ADD</button>
        </section>
        <section className='tasks'>
          <ul>
            {taskList.map((task, index)=>{
              return <li key={index}>{task}
              <section className="listBtn">
                <button type="button" onClick={()=> moveUp(index)}>☝️</button>
                <button type="button" onClick={()=> moveDown(index)}>👇</button>
                <button type="button" onClick={()=> handleDelete(index)}>❌</button>
              </section>
              </li>
            })}
          </ul>
        </section>
      </form>
    </section>
  )
}

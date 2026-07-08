import React, { useState, useEffect } from 'react'
import './Todo.css'

export default function Todo() {
  const [blank, setBlank] = useState({idle: true, input: false});
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([]);

  function handleChange(e){
    setTask(e.target.value)
  }
  function handleSubmit(e){
    e.preventDefault()
    if (task.trim() === ""){
      setBlank(prev => ({...prev, idle:false, input:true}))
      setTimeout(() => {
        setBlank(prev => ({...prev, idle:true, input:false}))
      }, 1400);
      return
    }
    setTaskList(prev=>[...prev, task])
    setTask("")
  }
  function handleDelete(index){
    const updatedTask = taskList.filter((_,i)=> i !== index);
    setTaskList(updatedTask)
  }
  function moveUp(index){
    const updatedTask = [...taskList]
    if (index > 0){
      [updatedTask[index-1], updatedTask[index]] = [updatedTask[index], updatedTask[index - 1]] 
      setTaskList(updatedTask)
      return
    }
  }
  function moveDown(index){
    const updatedTask = [...taskList];
    if (index < updatedTask.length - 1){
      [updatedTask[index + 1], updatedTask[index]] = [updatedTask[index], updatedTask[index + 1]]
      setTaskList(updatedTask)
      return
    }
    console.log("nah")
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
          <button type="button" type="submit">ADD</button>
        </section>
        <section className='tasks'>
          <ul>
            {taskList.map((task, index)=>[ <li key={index}> {task}
              <section className="listBtn">
                <button type="button" onClick={()=>moveUp(index)}>☝️</button>
                <button type="button" onClick={()=>moveDown(index)}>👇</button>
                <button type="button" onClick={()=>handleDelete(index)}>❌</button>
              </section>
            </li> ])}
          </ul>
        </section>
      </form>
    </section>
  )
}

import React from 'react';

import { fetchTasks, addTask, deleteTask, completeTask } from '../../api/TaskAPI'

const TaskList = ({projectID}) => {

  const [ tasks, setTasks ] = React.useState([])

  const [ completeTasks, setCompleteTasks ] = React.useState([])

  const [ taskDescription, setTaskDescription ] = React.useState("")

  const taskDescriptionHandler = event => {
    const currentTaskDescription = event.target.value
    setTaskDescription(currentTaskDescription)
  }

  const submitTask = event => {
    if (event) event.preventDefault()
    setTaskDescription("")
    addTask(projectID, taskDescription)
      .then(_ => {refreshTasks()})
      .catch(_ => {refreshTasks()})
  }

  const deleteTaskHandler = event => {
    const taskID = event.target.getAttribute("id")
    deleteTask(projectID, taskID)
      .then(_ => {refreshTasks()})
      .catch(_ => {refreshTasks()})
  }

  const completeTaskHandler = event => {
    const taskID = event.target.getAttribute("id")
    completeTask(projectID, taskID)
      .then(_ => {refreshTasks()})
      .catch(_ => {refreshTasks()})
  }

  const refreshTasks = () =>{
    fetchTasks(projectID)
    .then(result => {
      const data = result.data
      const Tasks = data.filter(element => !element.checked)
      const completeTasks = data.filter(element => element.checked)
      setTasks(Tasks)
      setCompleteTasks(completeTasks)
    })
  }

  React.useEffect(() => {
    refreshTasks()
  },[])


  return ( 
    <div className="taskForm">
      <h4>TO DO</h4>
      {tasks.map(task => {
        return(
          <div key={task.taskID} className="taskItem">
            <input type="checkbox" checked={task.checked} id={task.taskID} onChange={completeTaskHandler}/>
            <div>{task.description}</div>
            <div id={task.taskID} onClick={deleteTaskHandler} className="deleteOption"></div>
          </div>
        )
      })}
      <h4>DONE</h4>
      {completeTasks.map(task => {
        return (
          <div key={task.taskID} className="taskItem">
            <input type="checkbox" defaultChecked={task.checked}/>
            <div>{task.description}</div>
            <span className="taskDate">{task.finishDate}</span>
          </div>
        )
      })}
      <div className="taskAdd">
        <input type="text" value={taskDescription} onChange={taskDescriptionHandler} placeholder="new task name"></input>
        <div className="buttonStyle" onClick={submitTask}>Add</div>
      </div>
    </div>
   );
}
 
export default TaskList;
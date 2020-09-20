import React from 'react';

import { fetchProjects, addProject, deleteProject } from '../../api/ProjectAPI'
import TaskList from './TaskList';

const ProjectList = () => {

  const [ projectFetchState, setprojectFetchState ] = React.useState({
    status:false,
    message:"loading projects.."
  })

  const [ projects, setProjects ] = React.useState([])

  const [ projectName, setProjectName ] = React.useState([])

  const projectNameHandler = event => {
    const projectCurrentName = event.target.value
    setProjectName(projectCurrentName)
  }

  const submitProject = event => {
    if (event) event.preventDefault()
    setProjectName("")
    addProject(projectName)
      .then(_ => {refreshProjects()})
      .catch(_ => {refreshProjects()})
  }

  const deleteProjectHandler = event => {
    const projectID = event.target.getAttribute("id")
    deleteProject(projectID)
    .then(_ => {refreshProjects()})
    .catch(_ => {refreshProjects()})
  }

  const refreshProjects = () => {
    fetchProjects()
      .then(result => {
        setProjects(result.data)
        setprojectFetchState({...projectFetchState,status:true})
      }
      )
      .catch(_ => {
        setprojectFetchState({
          status:false,
          message:"problem occured fetching projects"
        })
      })
  }

  React.useEffect(() => {
    refreshProjects()
  },[])

  if(!projectFetchState.status) return (
    <div>{projectFetchState.message}</div>
  )

  return ( 
      <>
        <h1>Project List</h1>
        <div className="projectContainer">
        
        {projects.map(project => {
          return(<div className="taskContainer" key={project.projectID}>
            <div className="projectTitle gradientDecorator">
              <div>{project.projectName}</div>
              <div id={project.projectID} onClick={deleteProjectHandler} className="deleteOption"></div>
            </div>
            <TaskList projectID={project.projectID}/>
            </div>)
        })}

        <div className="taskContainer">
          <div className="projectTitle gradientDecorator">
            Create new Project
          </div>
          <div className="taskNewProject">
            <input type="text" value={projectName} onChange={projectNameHandler} placeholder="new project name"/>
            <div className="buttonStyle" onClick={submitProject}>Create Project</div>
          </div>
        </div>
      </div>
    </>
   );
}
 
export default ProjectList;
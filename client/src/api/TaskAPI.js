import axios from 'axios';

import AuthorizationConfig from './AuthorizationConfig';

const taskApiRoute = "api/task"

export const fetchTasks = async projectID => {
  const url = taskApiRoute + "/" + projectID
  const config = AuthorizationConfig()

  try{
    const response = await axios.get(url, config)
    return response
  }catch(request){
    return request.response
  }
}

export const addTask = async (projectID, description) => {
  const url = taskApiRoute + "/" + projectID
  const config = AuthorizationConfig()
  const data = {
    description:description
  }
  try{
    const response = await axios.post(url, data, config)
    return response
  }catch(request){
    return request.response
  }
}

export const deleteTask = async (projectID, taskID) => {
  const url = taskApiRoute + "/" + projectID + "/" + taskID
  const config = AuthorizationConfig()
  try{
    const response = await axios.delete(url, config)
    return response
  }catch(request){
    return request.response
  }
}

export const completeTask = async (projectID, taskID) => {
  const url = taskApiRoute + "/" + projectID + "/" + taskID
  const config = AuthorizationConfig()
  try{
    const response = await axios.put(url, {}, config)
    return response
  }catch(request){
    return request.response
  }
}

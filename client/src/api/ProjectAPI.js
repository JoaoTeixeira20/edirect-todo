import axios from 'axios';

import AuthorizationConfig from './AuthorizationConfig';

const projectApiRoute = 'api/project'

export const fetchProjects = async () => {
  const url = projectApiRoute
  const config = AuthorizationConfig()

  try{
    const response = await axios.get(url, config)
    return response
  }catch(request){
    return request.response
  }
}

export const addProject = async projectName => {
  const url = projectApiRoute
  const config = AuthorizationConfig()
  const data = {
    projectName: projectName
  }
  try{
    const response = await axios.post(url, data, config)
    return response
  }catch(request){
    return request.response
  }
}

export const deleteProject = async projectID => {
  const url = projectApiRoute + "/" + projectID
  const config = AuthorizationConfig()
  try{
    const response = await axios.delete(url, config)
    return response
  }catch(request){
    return request.response
  }
}
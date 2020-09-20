import axios from 'axios';

const loginApiRoute = 'api/user'

export const loginUser = async (username, password) => {
  const url = loginApiRoute + "/login"
  const data = {
    username:username,
    password:password
  }
  try{
    const response = await axios.post(url, data)
    return response
  }catch(request){
    return request.response
  }
}

export const registerUser = async (name, username, password) => {
  const url = loginApiRoute + "/signup"
  const data = {
    name:name,
    username:username,
    password:password
  }
  try{
    const response = await axios.post(url, data)
    return response
  }catch(request){
    return request.response
  }
}
export default function AuthorizationConfig() {
  const token = localStorage.getItem('Token')
  return {headers: { Authorization: "Bearer " + token}}
}
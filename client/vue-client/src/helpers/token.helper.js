export const setToken = (token) => {
  localStorage.setItem('token', token)
}

export const getToken = () => {
  const token = localStorage.getItem('token')
  if(token && token !== 'undefined') {
    let payload =
      JSON.parse(window.atob(token.split('.')[1]))
    if(payload.exp - Date.now() / 1000 <= 60 * 30) {
      deleteToken()
      return ''
    }
    return token
  }
  deleteToken()
  return ''
}

export const deleteToken = () => {
  localStorage.clear()
}

export const getPayload = () => {
  const token = getToken()
  let payload = {}
  if(token) {
    payload = token.split('.')[1]
    payload = JSON.parse(window.atob(payload))
  }
  return payload
}

export const getCookie = key => {
  const cookieData = document.cookie.split(";")
  const keyIndex = cookieData.findIndex(_ => _.trim().startsWith(key + "="))

  if (keyIndex === -1) return null

  return cookieData[keyIndex].trim().slice(key.length + 1)
}

function delete_cookie(name, path, domain) {}

export const deleteCookie = name => {
  document.cookie = name + "=" + ";expires=Thu, 01 Jan 1970 00:00:01 GMT"
}

export const SessionCookie = "session-cookie"
export const AccessCookie = "access-cookie"

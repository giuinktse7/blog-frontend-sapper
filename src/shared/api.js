import axios from "axios"

const instance = axios.create({ baseURL: "http://localhost:8080" })

export const getPosts = () => {
  instance
    .get("posts", { withCredentials: true })
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

export async function refreshToken() {
  return await instance
    .get("refresh-short-token", { withCredentials: true })
    .catch(err => "You do not have access to this resource.")
}

export async function getUser() {
  return await instance.get("get-user", { withCredentials: true })
}

export async function getSecret() {
  const res = await instance
    .get("secret", { withCredentials: true })
    .catch(err => "You do not have access to this resource.")

  console.log("Res of getSecret:")
  console.log(res)
}

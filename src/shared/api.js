import axios from "axios"

const instance = axios.create({ baseURL: "http://localhost:8080" })

export const getPosts = async () => {
  return await instance.get("posts", { withCredentials: true })
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

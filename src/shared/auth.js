import axios from "axios"

const instance = axios.create({ baseURL: "http://localhost:8080" })

export const loginUser = user => {
  return instance.post("login", {
    username: user.username,
    password: user.password
  })
}

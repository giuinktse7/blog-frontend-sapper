import { goto } from "@sapper/app"
import { userStore } from "../stores/user.js"
import { getUser } from "../shared/api.js"

export function authenticateUser() {
  getUser()
    .then(({ data: user }) => userStore.set(user))
    .catch(_ => {
      console.log("No available user session found. Redirecting to login page.")

      try {
        goto("login")
      } catch {
        //No-op
      }
    })
}

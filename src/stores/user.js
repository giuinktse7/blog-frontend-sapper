import { writable } from "svelte/store"

/**
interface User {
  username: string
  id: number
}
*/
export const userStore = writable(null)

export const authStore = writable(null)

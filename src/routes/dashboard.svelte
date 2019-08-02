<script context="module">
  import { getPosts, refreshToken, getSecret, getUser } from "../shared/api.js";
  import {
    getCookie,
    SessionCookie,
    AccessCookie,
    deleteCookie
  } from "../cookie.js";

  export async function preload({ params, query }) {}
</script>

<script>
  import { userStore } from "../stores/user.js";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";

  onMount(() => {
    if (!getCookie(SessionCookie)) {
      goto("login");
    }
  });

  let user = null;
  const unsubscribeUser = userStore.subscribe(u => (user = u));
  if (!user) {
    console.log("No user");

    getUser()
      .then(res => {
        console.log(res.statusCode);

        userStore.set(res.data);
      })
      .catch(err => {
        console.log("In error");

        goto("login");
      });
  }

  // const posts = await getPosts();
  // const token = await refreshToken();
  // const res = await getSecret();

  $: username =
    user === null || user === undefined
      ? "Anonymous"
      : user.username.charAt(0).toUpperCase() + user.username.slice(1);

  const logout = e => {
    userStore.set(null);
    deleteCookie(SessionCookie);
    deleteCookie(AccessCookie);
    goto("login");
  };
</script>

<style lang="scss">
  @import "../defaultStyle.scss";
  @import "../variables.scss";

  .container {
    background: white;
    box-shadow: 0 40px 40px 0 rgba(0, 0, 0, 0.05);
    max-width: 70%;
    padding: 2rem 0 3.5rem 0;
    margin: auto;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 4px;
  }

  button {
    font-size: 0.9rem;
    margin-top: 3rem;
    border-radius: 1.5rem;
    box-shadow: none;
    border: none;
    background: $violet-red;
    padding: 0.75rem;
    color: white;
    cursor: pointer;
    text-transform: uppercase;
    letter-spacing: 0.15rem;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: darken($violet-red, 10%);
    }
  }
</style>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

{#if !user}

{:else}
  <div class="container">
    <p>Welcome, {username}!</p>
    <button on:click={logout}>Log out</button>
  </div>
{/if}

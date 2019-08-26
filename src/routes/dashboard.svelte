<script context="module">
  import { getPosts, refreshToken, getSecret } from "../shared/api.js";
  import {
    getCookie,
    SessionCookie,
    AccessCookie,
    deleteCookie
  } from "../cookie.js";
</script>

<script>
  import { userStore } from "../stores/user.js";
  import { authenticateUser } from "../auth/user.js";
  import { goto } from "@sapper/app";
  import { onMount } from "svelte";

  const isEmpty = x => x.length === 0;

  const locale = "en-GB";
  const formatDate = dateString =>
    new Date(Date.parse(dateString)).toLocaleDateString(locale);

  let user = null;
  let posts = [];

  onMount(() => {
    if (!getCookie(SessionCookie)) {
      goto("login");
    }

    getPosts()
      .then(({ data }) => (posts = data))
      .catch(err => console.log("Error", err));
  });

  const unsubscribeUser = userStore.subscribe(u => (user = u));
  authenticateUser();

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
    margin-top: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 4px;
  }

  .post {
    max-width: 700px;
    margin: 3rem auto;
  }

  button {
    font-size: 0.9rem;
    margin-top: 3rem;
    border-radius: 1.5rem;
    box-shadow: none;
    border: none;
    width: 200px;
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

{#if user}
  <div class="container">
    <p>Welcome, {username}!</p>
    <button on:click={logout}>Log out</button>
  </div>
{/if}

{#each posts as post}
  <div class="post container" key={post.id}>
    <h1>{post.title}</h1>
    <p>{formatDate(post.creationDate)}</p>
    <p>{post.content}</p>
  </div>
{/each}

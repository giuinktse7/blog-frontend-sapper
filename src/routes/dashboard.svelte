<script context="module">
  import { getPosts, refreshToken, getSecret } from "../shared/api.js";

  export async function preload({ params, query }) {
    console.log("Preload query: ", query);

    console.log("In preload");

    const token = await refreshToken();
    console.log("Token:", token);

    const res = await getSecret();

    return res;
  }
</script>

<script>
  import { userStore } from "../stores/user.js";

  let currentUser;
  const unsubscribeUser = userStore.subscribe(user => (currentUser = user));

  $: username =
    currentUser === null
      ? "Anonymous"
      : currentUser.username.charAt(0).toUpperCase() +
        currentUser.username.slice(1);
</script>

<style lang="scss">
  @import "../defaultStyle.scss";
  .container {
    background: white;
    box-shadow: 0 40px 40px 0 rgba(0, 0, 0, 0.05);
    max-width: 80%;
    padding: 2rem 0 3.5rem 0;
    margin: auto;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 4px;
  }
</style>

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

<div class="container">
  <p>Welcome, {username}!</p>
</div>

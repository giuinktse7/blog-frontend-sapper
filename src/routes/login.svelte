<script>
  import Input from "../components/Input.svelte";
  import { loginUser } from "../shared/auth.js";
  import { userStore } from "../stores/user.js";
  import { goto } from "@sapper/app";
  let mail = "";
  let password = "";

  const Status = {
    ok: "ok",
    error: "error"
  };

  const StatusMessage = {
    none: "",
    incorrectCredentials: "Incorrect username or password.",
    serverNotResponding: "The server did not respond."
  };

  let status = Status.ok;
  let statusMessage = StatusMessage.none;

  const performLogin = e => {
    e.preventDefault();
    loginUser({
      username: mail,
      password
    })
      .then(({ data: user }) => {
        if (user.username) {
          userStore.set(user);
          goto("dashboard");
        } else {
          status = Status.error;
          statusMessage = StatusMessage.incorrectCredentials;
        }
      })
      .catch(e => {
        status = Status.error;
        statusMessage = StatusMessage.serverNotResponding;
      });
  };
</script>

<style lang="scss">
  @import "../defaultStyle.scss";
  @import "../variables.scss";

  h2 {
    font-size: 2rem;
    font-family: $heading-font;
    opacity: 0.7;
  }

  .login-box {
    background: white;
    box-shadow: 0 40px 40px 0 rgba(0, 0, 0, 0.05);
    max-width: 22rem;
    padding: 2rem 0 3.5rem 0;
    margin: auto;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
    border-radius: 4px;

    .form {
      margin-top: 2rem;
      display: flex;
      flex-direction: column;

      > button {
        font-size: 0.9rem;
        margin-top: 3rem;
        border-radius: 1.5rem;
        box-shadow: none;
        border: none;
        background: $violet-red;
        padding: 0.75rem;
        color: white;
        align-self: stretch;
        cursor: pointer;
        text-transform: uppercase;
        letter-spacing: 0.15rem;
        transition: all 0.2s ease-in-out;
        &:hover {
          background: darken($violet-red, 10%);
        }
      }
    }
  }

  .status {
    font-size: 0.8rem;
    margin: 0;

    &.ok {
      visibility: hidden;
    }

    &.error {
      visibility: visible;
      color: tomato;
    }
  }
</style>

<svelte:head>
  <title>Login</title>
</svelte:head>
<div class="login-box">
  <h2>Welcome</h2>

  <form class="form" on:submit={performLogin}>
    <Input bind:value={mail} placeholder="Email" />

    <Input bind:value={password} type="password" placeholder="Password" />
    <p class={`status ${status}`}>{statusMessage}</p>
    <button on:click={performLogin}>Log in</button>
  </form>

</div>

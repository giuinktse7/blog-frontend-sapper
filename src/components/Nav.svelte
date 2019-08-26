<script>
  import { userStore } from "../stores/user.js";
  import { authenticateUser } from "../auth/user.js";

  export let segment;

  let user = null;
  $: hideLogin = user && user !== null;

  const unsubscribeUser = userStore.subscribe(u => (user = u));
  authenticateUser();

  /*
  for the blog link, we're using rel=prefetch so that Sapper prefetches
  the blog data when we hover over the link or tap it on a touchscreen
  */
  let items = [
    { segment: undefined, href: ".", text: "Home" },
    { segment: "about", href: "about", text: "About" },
    {
      segment: "blog",
      href: "blog",
      text: "Blog",
      extra: { rel: "prefetch" }
    },
    {
      segment: "login",
      href: "login",
      text: "Login"
    },
    {
      segment: "dashboard",
      href: "dashboard",
      text: "Dashboard",
      rel: "prefetch"
    }
  ];

  $: loginItemFilter = navItem => !(user && navItem.segment === "login");

  $: filteredItems = items.filter(loginItemFilter);
</script>

<style type="text/scss" lang="scss">
  @import "../variables.scss";

  nav {
    position: fixed;
    top: 0;
    width: 100vw;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
    background: $violet-red;

    > ul {
      max-width: 56rem;
      margin: auto;
    }
  }
  ul {
    color: $light-text;
    font-family: $menu-font;
    font-size: $font-md1;
    margin: 0;
    padding: 0;

    &:after {
      content: "";
      display: block;
      clear: both;
    }
  }

  li {
    display: block;
    float: left;
  }
  .selected {
    position: relative;
    display: inline-block;

    > p {
      padding-bottom: 0.5rem;
      position: relative;

      &:after {
        opacity: 1;
      }
    }
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;

    > p {
      display: inline-block;
      margin: 0;
    }
  }

  a::before,
  a::after {
    display: inline-block;
    opacity: 0;
    transition: transform 0.3s, opacity 0.2s;
  }

  a::before {
    margin-right: 10px;
    content: "[";
    transform: translateX(20px);
  }

  a::after {
    margin-left: 10px;
    content: "]";
    transform: translateX(-20px);
  }

  a:hover::before,
  a:hover::after,
  a:focus::before,
  a:focus::after,
  a.selected::before,
  a.selected::after {
    opacity: 1;
    transform: translateX(0px);
  }
</style>

<nav>
  <ul>
    {#each filteredItems as item}
      <li>
        <a
          class={segment === item.segment ? 'selected' : ''}
          href={item.href}
          {...item.extra}>
          <p>{item.text}</p>
        </a>
      </li>
    {/each}
  </ul>
</nav>

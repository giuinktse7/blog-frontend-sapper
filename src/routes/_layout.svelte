<script>
  import Nav from "../components/Nav.svelte";

  export let segment;
  $: console.log(segment);
</script>

<style>
  main {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>

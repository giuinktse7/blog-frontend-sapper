<script>
  export let placeholder = "";
  export let value;
  export let type = "text";

  let labelWidth;
  $: width = labelWidth + "px";
  $: {
    console.log(labelWidth);
  }
</script>

<style lang="scss">
  @import "../variables.scss";
  .input {
    position: relative;
  }
  label {
    position: absolute;
    left: 0;
    top: 4px;
    font-size: 1rem;
    color: #969696;

    transform-origin: bottom left;
    transition: 150ms ease all;
    pointer-events: none;
    &.has-value {
      transform: scale(0.8) translateX(calc(var(--labelWidth) * (-1) - 1rem));
    }
  }
  input {
    padding: 0.5rem;
    outline: none;
    border: none;
    border-bottom: 1px solid lighten($violet-red, 20%);
    transition: border-color 0.2s ease-in;
    margin-bottom: 0.5rem;

    &:focus {
      border-color: $violet-red;
    }
    &:focus ~ label {
      transform: scale(0.8) translateX(calc(var(--labelWidth) * (-1) - 1rem));
    }
  }
</style>

<div class="input" style="--labelWidth: {labelWidth}px">
  {#if type === 'password'}
    <input bind:value type="password" />
  {:else}
    <input bind:value />
  {/if}
  <label bind:clientWidth={labelWidth} class:has-value={value}>
    {placeholder}
  </label>
</div>

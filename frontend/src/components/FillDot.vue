<template>
  <svg width="100" height="50">
    <circle
      cx="25"
      cy="25"
      r="10"
      stroke="black"
      stroke-width="4"
      :fill="fill"
    />
  </svg>
</template>

<script>
export default {
    name: 'FillDot',
    props: {
        fill: String
    }
};
</script>

<style>
circle:hover {
    cursor: pointer;
}
</style>
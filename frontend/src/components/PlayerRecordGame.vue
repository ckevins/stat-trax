<template>
  <div class="full-component">
    <div class="component-text">
      <h1>Record Game</h1>
    </div>
    <div class="actions">
      <button @click="$emit('cancel')">Cancel</button>
      <button>Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerRecordGame",
};
</script>
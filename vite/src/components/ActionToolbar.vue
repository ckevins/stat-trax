<template>
  <div class="actions">
    <button v-for="(action, index) in actions" :key="index" @click="emitAction(index)">
      {{ action.text }}
    </button>
  </div>
</template>

<script>
export default {
  name: "ActionToolbar",
  props: {
    actions: Array,
  },
  methods: {
    emitAction(index) {
      this.$emit(this.actions[index].action);
      console.log(this.actions[index].action)
    }
  }
};
</script>

<style>
.actions {
  position: absolute;
  top: 0;
  right: 0;
}

button {
  font-family: "Saira Condensed", sans-serif;
  font-size: 1.5em;
  border-radius: 10px;
  padding: 5px 20px;
  margin: 20px;
  background-image: linear-gradient(
    to left,
    rgba(21, 205, 40, 1) 0%,
    rgba(16, 127, 17, 1) 50%,
    rgba(12, 66, 0, 1) 100%
  );
  background-size: 200% 100%;
  color: white;
  transition: 1.5s;
  border: none;
}

button:hover {
  background-position: 100% 0;
  padding: 5px 60px 5px 20px;
  cursor: pointer;
}
</style>
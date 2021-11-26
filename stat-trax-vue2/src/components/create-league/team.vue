<template>
  <div class="team">
    <input
      type="text"
      id="team-name"
      v-model="nickname"
      :style="{ color: fontColor }"
      placeholder="Team Name"
    />
    <div>
      <label>Color:</label>
      <input type="color" id="team-color" v-model="primaryColor" /><br />
      <label>Manager:</label>
      <input
        type="text"
        id="manager"
        v-model="manager"
        placeholder="Last Name, First Name"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Team",
  data() {
    return {
      nickname: null,
      primaryColor: "#ffffff",
      manager: null,
    };
  },
  computed: {
    fontColor() {
      if (this.primaryColor === "#ffffff") {
        return "black";
      } else {
        return this.primaryColor;
      }
    },
  },
};
</script>

<style scoped>
.team {
  color: v-bind("fontColor()");
  background-color: white;
  padding: 2.5%;
  margin: 10px 0;
  width: 100%;
  border: 2px solid black;
  border-radius: 20px;
  position: relative;
}

input {
  font-size: 1.25em;
  color: black;
  font-weight: bold;
  margin: 2px;
}

#manager {
  font-size: 1em;
}
</style>

<template>
  <div class="division">
    <div class="division-head">
      <input
        id="division-name"
        type="text"
        placeholder="Division Name"
        v-model="divisionName"
      />
      <div class="division-size">
        <h3># of teams: {{ teams }}</h3>
        <button class="division-size-button" v-on:click="addTeam()">+</button>
        <button class="division-size-button" v-on:click="subtractTeam()">
          -
        </button>
      </div>
    </div>
    <div class="teams-parent">
      <Team v-for="index in teams" :key="index" />
    </div>
  </div>
</template>

<script>
import Team from "./team.vue";

export default {
  name: "Division",
  components: {
    Team,
  },
  data() {
    return {
      divisionName: null,
      teams: 4,
    };
  },
  methods: {
    addTeam() {
      this.teams++;
    },
    subtractTeam() {
      this.teams--;
    },
  },
};
</script>

<style scoped>
.division {
  color: black;
  background-color: white;
  padding: 2.5%;
  margin: 10px;
  width: 45%;
  border: 2px solid #1e392a;
  border-radius: 30px;
}

input {
    font-size:1.5em;
    color: black;
    font-weight: bold;
}

button {
  width: 30px;
  height: 30px;
  margin: 5px;
  background-color: #4d926d;
  border: 1px solid #1e392a;
  color: white;
}
</style>
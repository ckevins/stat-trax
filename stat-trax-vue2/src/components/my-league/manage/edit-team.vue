<template>
  <div class="edit-team">
    <button @click="$emit('exit-team')" class="exit">X</button>
    <h2>{{ team.name }}</h2>
    <div class="header">
      <div>
        <h3>Team Name:</h3>
        <p>{{ team.name }}</p>
      </div>
      <div>
        <h3>Color:</h3>
        <div class="color-box" :style="colorBox"></div>
      </div>
      <div>
        <h3>Manager:</h3>
        <p>{{ team.manager }}</p>
      </div>
    </div>
    <div class="roster">
      <h3>Roster</h3>
      <div class="table head" :style="lineStyle">
        <h4>#</h4>

        <h4>Player</h4>
        <h4>Pos.</h4>
        <h4>Sec. Pos</h4>
        <h4>Bats / Throws</h4>
      </div>
      <div
        class="table row"
        v-for="(player, index) in team.Players"
        :key="index"
      >
        <p>{{ player.number }}</p>

        <p>{{ player.name }}</p>
        <p>{{ player.position }}</p>
        <p>{{ player.secPosition }}</p>
        <p>{{ player.batsThrows }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "EditTeam",
  props: {
    team: Object,
  },
  computed: {
      colorBox() {
          return {
              backgroundColor: this.team.color
          }
      },
      lineStyle() {
          return {
              borderBottom: "4px solid" + this.team.color
          }
      }
  }
};
</script>

<style scoped>
h2 {
  color: black;
}

.edit-team {
  position: relative;
  color: black;
}

.header {
  display: flex;
  justify-content: space-evenly;
}

.exit {
  position: absolute;
  right: 0;
  top: 0;
  margin: 5px;
  width: 30px;
  height: 30px;
}

.roster {
  width: 90%;
  padding: 5px;
  margin: auto;
}

.table {
  display: grid;
  grid-template-columns: 0.15fr 1fr 0.5fr 0.5fr 0.5fr;
  padding: 0 15px;
}

.row {
  border-bottom: 1px solid lightgray;
}

.row:hover {
  background-color: rgb(235, 235, 235);
}

.color-box {
    width: 40px;
    height: 20px;
}
</style>
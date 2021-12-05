<template>
  <div class="scorecard-row">
    <PlayerSelect :team="teamData" :row="row" />
    <div class="diamonds-container">
      <Diamond
        v-for="inning in inningsRendered"
        :teamData="teamData"
        :key="inning"
        :inning="inning"
        :row="row"
      />
    </div>
    <Tally :team="teamData" :row="row" />
  </div>
</template>

<script>
import PlayerSelect from "./player-select.vue";
import Diamond from "./diamond.vue";
import Tally from "./tally.vue";

export default {
  name: "Row",
  props: {
    teamData: Object,
    inningsRendered: Array,
    row: Number,
  },
  components: {
    PlayerSelect,
    Diamond,
    Tally,
  },
};
</script>

<style scoped>
.cell {
  margin: 2px;
}

.scorecard-row {
  margin: auto;
  width: 99%;
  display: flex;
}

.diamonds-container {
  width: 65%;
  display: flex;
  justify-content: space-evenly;
}
</style>
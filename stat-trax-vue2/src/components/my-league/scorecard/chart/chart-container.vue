<template>
  <div class="chart">
    <h2 id="active-team">{{ gameData[activeTeam].info.nickname }}</h2>
    <ColumnHeads
      :inningsRendered="inningsRendered"
      :toggleUp="toggleUp"
      :toggleDown="toggleDown"
    />
    <Row
      v-for="index in 10"
      :key="index"
      :teamData="teamData"
      :inningsRendered="inningsRendered"
      :row="index"
      @update-team-data="$emit('update-team-data', gameData)"
    />
  </div>
</template>

<script>
import ColumnHeads from "./column-heads.vue";
import Row from "./row.vue";

export default {
  name: "Chart",
  props: {
    gameData: Object,
    activeTeam: String,
    inningsRendered: Array,
    toggleUp: Function,
    toggleDown: Function,
  },
  data() {
    return {
      teamData: this.gameData[this.activeTeam],
    };
  },
  components: {
    ColumnHeads,
    Row,
  },
};
</script>

<style scoped>
h2 {
  color: white;
  text-align: center;
}

h5 {
  padding: 5px;
  margin: 0;
}

p {
  margin: 0;
}

#active-team {
  text-decoration: underline;
}

select {
  background-color: white;
  border: 1px solid black;
}
</style>
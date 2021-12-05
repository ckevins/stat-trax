<template>
  <div class="scorecard-columns">
    <div class="player-selects-head cell">
      <h2>Lineup</h2>
    </div>
    <div class="inning-heads">
      <h2
        v-for="inning in inningsRendered"
        class="cell"
        id="inning-columns"
        :key="inning"
      >
        {{ inning }}
      </h2>
    </div>
    <div class="inning-buttons cell">
      <button id="inning-button" @click="toggleDown">&lt;&lt;&lt;</button>
      <button id="inning-button" @click="toggleUp">&gt;&gt;&gt;</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ColumnHeads",
  props: {
    inningsRendered: Array,
    toggleUp: Function,
    toggleDown: Function,
  },
};
</script>

<style scoped>
.inning-heads {
  width: 65%;
  display: flex;
  justify-content: space-around;
}

.scorecard-columns {
  margin: auto;
  width: 99%;
  display: flex;
}

.player-selects-head {
  width: 15%;
  padding: 5px;
  justify-content: center;
  border: 1px solid #4d926d;
}

#inning-button {
  flex-grow: 2;
  height: 60%;
  margin: 5px;
  border: 4px ridge #1e392a;
  border-radius: 100px;
  font-size: 1.5em;
  font-weight: bold;
  background-color: white;
}

#inning-button:hover {
  background-color: rgb(189, 189, 189);
}

#inning-button:active {
  transform: scale(0.95);
}
</style>

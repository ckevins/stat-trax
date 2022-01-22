<template>
  <div class="full-component">
    <div class="component-text">
      <h1>Record Game</h1>
      <div class="player-select">
        <label>Player:</label>
        <select v-model="activePlayer">
          <option value="">--select--</option>
          <option
            v-for="(player, index) in players"
            :key="index"
            :value="player"
          >
            {{ player.firstName }} {{ player.lastName }}
          </option>
        </select>
      </div>
      <div class="atbat-input">
        <div class="diamonds">
          <div v-for="index in abCount" :key="index">
            <RecordGameDiamond />
          </div>
        </div>
        <div class="adjust-abCount">
          <button id="plus" @click="abCount += 1">+</button>
          <button id="minus" @click="abCount -= 1">-</button>
        </div>
        <GameLogStatTable class="stat-table" :game="game" />
      </div>
    </div>
    <div class="actions">
      <button @click="$emit('cancel')">Cancel</button>
      <button>Submit</button>
    </div>
  </div>
</template>

<script>
import RecordGameDiamond from "@/components/RecordGameDiamond.vue";
import GameLogStatTable from "@/components/GameLogStatTable.vue";

export default {
  name: "PlayerRecordGame",
  props: {
    players: Array,
  },
  components: {
    RecordGameDiamond,
    GameLogStatTable,
  },
  data() {
    return {
      activePlayer: "",
      game: {
        atBats: [],
      },
      abCount: 3,
    };
  },
};
</script>

<style scoped>
.player-select {
  display: flex;
  align-items: center;
  font-size: 2em;
  width: 25%;
  justify-content: space-between;
}

select {
  height: 100%;
  font-size: 1em;
}

.atbat-input {
  margin-top: 20px;
  width: 90%;
  height: 600px;
  display: flex;
  align-items: center;
  margin: auto;
}

.diamonds {
  width: 100%;
  display: flex;
  align-items: center;
}

.adjust-abCount {
  display: flex;
  flex-direction: column;
  width: 20%;
}

.stat-table {
  width: 25%;
}
</style>
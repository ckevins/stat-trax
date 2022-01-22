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
          <div v-for="(atBat, index) in game.atBats" :key="index">
            <RecordGameDiamond @update="updateAtBat(index, ...arguments)" />
          </div>
        </div>
        <div class="adjust-abCount">
          <button id="plus" @click="addOne">+</button>
          <button id="minus" @click="subtractOne">-</button>
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

class atBat {
  constructor() {
    this.result = "";
    this.inning = 0;
    this.rbi = 0;
    this.sb = 0;
    this.cs = 0;
    this.runnerProgress = 0;
    this.balls = 0;
    this.strikes = 0;
  }
}

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
        atBats: [new atBat(), new atBat(), new atBat()],
      },
    };
  },
  methods: {
    addOne() {
      this.game.atBats.push(new atBat());
    },
    subtractOne() {
      if (this.game.atBats.length > 0) {
        this.game.atBats.pop();
      }
    },
    updateAtBat(index, atBat) {
      console.log('updated!');
      this.game.atBats[index] = atBat;
    }
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
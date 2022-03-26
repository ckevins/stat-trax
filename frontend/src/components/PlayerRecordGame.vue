<template>
  <div class="full-component record-game">
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
          <div v-for="(atBat, index) in atBats" :key="index">
            <RecordGameDiamond @update="updateAtBat(index, ...arguments)" />
          </div>
        </div>
        <div class="adjust-abCount">
          <button id="plus" @click="addOne">+</button>
          <button id="minus" @click="subtractOne">-</button>
        </div>
        <GameLogStatTable class="stat-table" :atBats="atBats" :updateKey="updateKey" />
      </div>
    </div>
    <div class="actions">
      <button @click="$emit('cancel')">Cancel</button>
      <button @click="submitGame">Submit</button>
    </div>
  </div>
</template>

<script>
import RecordGameDiamond from "../components/RecordGameDiamond.vue";
import GameLogStatTable from "../components/GameLogStatTable.vue";
import { serviceFactory } from "../services/factory";

const gamesService = serviceFactory.get("games");


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
    player: Object,
  },
  components: {
    RecordGameDiamond,
    GameLogStatTable,
  },
  data() {
    return {
      date: "",
      opponent: "",
      atBats: [new atBat(), new atBat(), new atBat()],
      updateKey: 0
    };
  },
  methods: {
    addOne() {
      this.atBats.push(new atBat());
    },
    subtractOne() {
      if (this.atBats.length > 0) {
        this.atBats.pop();
      }
    },
    updateAtBat(index, atBat) {
      this.atBats[index] = atBat;
      this.updateKey += 1
    },
    submitGame() {
      let game = {
        IndividualPlayer: this.player,
        Date: this.date,
        Opponent: this.opponent,
        AtBats: this.atBats
      };
      gamesService.post(game);
    }
  },
};
</script>

<style scoped>
.record-game {
  background-color: white;
  z-index: 10;
}

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
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0;
  bottom: 0;
  width: 90%;
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
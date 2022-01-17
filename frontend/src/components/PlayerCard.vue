<template>
  <div class="full-component">
    <div class="component-text">
      <h3>Player Card</h3>
      <h1>{{ player.firstName }} {{ player.lastName }}</h1>
      <div class="sub-title">
        <h2># {{ player.number }}</h2>
        <h2>{{ player.position }}</h2>
      </div>

      <div class="game-log head">
        <h3>Date</h3>
        <h3>Opponent</h3>
        <h3>Stats</h3>
        <h3 v-for="index in 9" :key=index>{{ index }}</h3>
      </div>

      <div class="game-log" v-for="(game, index) in gameData" :key="index">
        <p> date </p>
        <p>{{ game.opponent }}</p>
        <p> stat table </p>
        <div v-for="abIndex in 9" :key="abIndex">
          <p v-if="checkAtBatInning(game, abIndex)">{{ getResult(game, abIndex) }}</p>
        </div>
      </div>
    </div>
    <div class="actions">
      <button @click="$emit('cancel')">Back</button>
    </div>
  </div>
</template>

<script>
import { serviceFactory } from "@/services/factory";

const gamesService = serviceFactory.get("games");

export default {
  name: "PlayerCard",
  props: {
    player: Object,
  },
  data() {
    return {
      isLoading: false,
      gameData: []
    };
  },
  created() {
    this.fetchGameData(this.player.individualPlayerId);
  },
  methods: {
    async fetchGameData(id) {
      this.isLoading = true;
      const { data } = await gamesService.get(id);
      this.isLoading = false;
      this.gameData = data;
      console.log("gameData", this.gameData);
    },
    checkAtBatInning(game, abIndex) {
      let inningCheck = false;
      game.atBats.forEach(ab => {
        if (ab.inning === abIndex) {
          inningCheck = true;
        }
      });
      return inningCheck;
    },
    getResult(game, abIndex) {
      let result = ""
      game.atBats.forEach(ab => {
        if (ab.inning === abIndex) {
          result = ab.result
        }
      });
      return result
    }
  }
};
</script>

<style scoped>
.sub-title {
  display: flex;
}

h1, h2 {
  margin-top: 0;
  margin-bottom: 0;
}

h2 {
  margin-right: 30px;
}

.game-log {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>
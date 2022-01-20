<template>
  <div class="full-component">
    <div class="component-text">
      <h3>Player Card</h3>
      <div class="sub-title">
        <h1>{{ player.firstName }} {{ player.lastName }}</h1>
        <h2># {{ player.number }}</h2>
        <h2>{{ player.position }}</h2>
      </div>

      <PlayerCardStatTable :games="gameData" />

      <div class="game-log head">
        <h2 id="date">Date</h2>
        <h2>Opponent</h2>
        <h2>Stats</h2>
        <h2 v-for="index in 9" :key="index">{{ index }}</h2>
      </div>

      <div class="game-log" v-for="(game, index) in gameData" :key="index">
        <h3 id="date">{{ getDate(game.date) }}</h3>
        <h2 id="opponent">{{ game.opponent }}</h2>
        <GameLogStatTable :game="game" />
        <div v-for="abIndex in 9" :key="abIndex">
          <GameLogDiamond
            v-if="checkAtBatInning(game, abIndex)"
            :atBat="getAtBat(game, abIndex)"
          />
          <GameLogDiamond v-else />
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
import PlayerCardStatTable from "@/components/PlayerCardStatTable.vue";
import GameLogDiamond from "@/components/GameLogDiamond.vue";
import GameLogStatTable from "@/components/GameLogStatTable.vue";

const gamesService = serviceFactory.get("games");

export default {
  name: "PlayerCard",
  props: {
    player: Object,
  },
  components: {
    PlayerCardStatTable,
    GameLogDiamond,
    GameLogStatTable,
  },
  data() {
    return {
      isLoading: false,
      gameData: [],
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
      game.atBats.forEach((ab) => {
        if (ab.inning === abIndex) {
          inningCheck = true;
        }
      });
      return inningCheck;
    },
    getAtBat(game, abIndex) {
      let atBat;
      game.atBats.forEach((ab) => {
        if (ab.inning === abIndex) {
          atBat = ab;
        }
      });
      return atBat;
    },
    getDate(data) {
      let date = new Date(data);
      return date.toDateString("en-US");
    },
  },
};
</script>

<style scoped>
.sub-title {
  display: flex;
}

h1,
h2 {
  margin-top: 0;
  margin-bottom: 0;
}

h2 {
  text-align: center;
}

.game-log {
  display: grid;
  grid-template-columns: 1fr 2fr 3fr 150px 150px 150px 150px 150px 150px 150px 150px 150px;
  align-items: center;
}

#date {
  text-align: right;
}

#opponent {
  font-size: 2em;
}
</style>
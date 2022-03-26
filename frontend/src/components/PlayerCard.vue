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
        <div class="inning-numbers">
          <h2 v-for="index in 9" :key="index">{{ index }}</h2>
        </div>
      </div>

      <div class="game-log" v-for="(game, index) in gameData" :key="index">
        <h3 id="date">{{ getDate(game.date) }}</h3>
        <h2 id="opponent">{{ game.opponent }}</h2>
        <GameLogStatTable :atBats="game.atBats" />
        <div class="ab-chart">
          <div v-for="abIndex in 9" :key="abIndex">
            <GameLogDiamond
              v-if="checkAtBatInning(game, abIndex)"
              :atBat="getAtBat(game, abIndex)"
            />
            <GameLogDiamond v-else />
          </div>
        </div>
      </div>
    </div>
    <ActionToolbar
      :actions="actions"
      @record-game="recordGame = !recordGame"
      @back="$emit('cancel')"
    />
    <RecordGame
      v-if="recordGame"
      :player="player"
      @cancel="recordGame = false"
    />
  </div>
</template>

<script>
import { serviceFactory } from "@/services/factory";
import ActionToolbar from "@/components/ActionToolbar.vue";
import RecordGame from "@/components/PlayerRecordGame.vue";
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
    ActionToolbar,
    RecordGame,
    PlayerCardStatTable,
    GameLogDiamond,
    GameLogStatTable,
  },
  data() {
    return {
      actions: [
        { text: "Record Game", action: "record-game" },
        { text: "Edit Player", action: "edit-player" },
        { text: "Back", action: "back" },
      ],
      isLoading: false,
      gameData: [],
      recordGame: false,
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

#date {
  text-align: right;
}

#opponent {
  font-size: 2em;
}

.game-log {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 6fr;
  align-items: center;
  position: relative;
}

.ab-chart,
.inning-numbers {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
}
</style>
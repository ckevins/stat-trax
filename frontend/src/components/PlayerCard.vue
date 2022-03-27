<template>
  <div>
    <div>
      <ActionToolbar
        :actions="actions"
        @record-game="recordGame = !recordGame"
        @back="$emit('back')"
      />
      <div class="grid grid-cols-4 p-5 w-1/2 gap-2">
        <h1 class="text-left text-5xl col-span-2">
          {{ playerCard.firstName }} {{ playerCard.lastName }}
        </h1>
        <h1 class="text-4xl"># {{ playerCard.number }}</h1>
        <h1 class="text-4xl">{{ playerCard.position }}</h1>
      </div>

      <PlayerCardStatTable :games="gameData" />

      <div v-if="gameData.length > 0" class="game-log head">
        <h2 id="date">Date</h2>
        <h2>Opponent</h2>
        <h2>Stats</h2>
        <div class="inning-numbers">
          <h2 v-for="index in 9" :key="index">{{ index }}</h2>
        </div>
      </div>

      <div class="game-log m-2" v-for="(game, index) in gameData" :key="index">
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

    <RecordGame
      v-if="recordGame"
      :player="playerCard"
      @cancel="recordGame = false"
    />
  </div>
</template>

<script>
import { serviceFactory } from "../services/factory";
import ActionToolbar from "../components/ActionToolbar.vue";
import RecordGame from "../components/RecordGame/PlayerRecordGame.vue";
import PlayerCardStatTable from "../components/PlayerCardStatTable.vue";
import GameLogDiamond from "../components/GameLog/GameLogDiamond.vue";
import GameLogStatTable from "../components/GameLog/GameLogStatTable.vue";

const gamesService = serviceFactory.get("games");

export default {
  name: "PlayerCard",
  props: {
    player: String,
    playerCard: Object,
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
        { text: "Delete Player", action: "delete-player" },
        { text: "Back", action: "back" },
      ],
      isLoading: false,
      gameData: [],
      recordGame: false,
    };
  },
  created() {
    this.fetchGameData(this.playerCard.individualPlayerId);
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
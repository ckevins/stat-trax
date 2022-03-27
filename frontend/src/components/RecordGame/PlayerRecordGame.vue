<template>
  <div class="record-game">
    <ActionToolbar
      :actions="actions"
      @add-ab="addOne"
      @subtract-ab="subtractOne"
      @cancel="$emit('cancel')"
      @submit="submitGame"
    />
    <div>
      <h1 class="text-3xl text-slate-600">Record Game</h1>
      <h1 class="text-5xl">
        {{ player.firstName }} {{ player.lastName }}
      </h1>
      <GameLogStatTable
        class="stat-table"
        :atBats="atBats"
        :updateKey="updateKey"
      />
      <div class="flex">
        <div v-for="(atBat, index) in atBats" :key="index">
          <AtBatInput @update="updateAtBat(index, ...arguments)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ActionToolbar from "../ActionToolbar.vue";
import AtBatInput from "./AtBatInput.vue";
import GameLogStatTable from "../GameLog/GameLogStatTable.vue";
import { serviceFactory } from "../../services/factory";

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
    ActionToolbar,
    AtBatInput,
    GameLogStatTable,
  },
  data() {
    return {
      actions: [
        { text: "Cancel", action: "cancel" },
        { text: "- AB", action: "subtract-ab" },
        { text: "+ AB", action: "add-ab" },
        { text: "Submit", action: "submit" },
      ],
      date: "",
      opponent: "",
      atBats: [new atBat(), new atBat(), new atBat()],
      updateKey: 0,
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
      this.updateKey += 1;
    },
    submitGame() {
      let game = {
        IndividualPlayer: this.player,
        Date: this.date,
        Opponent: this.opponent,
        AtBats: this.atBats,
      };
      gamesService.post(game);
    },
  },
};
</script>

<style scoped>
</style>
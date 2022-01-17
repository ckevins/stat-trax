<template>
  <div class="players view">
    <h1>Players</h1>
    <div class="actions">
      <button @click="recordGame = !recordGame" id="record">Record Game</button>
      <button @click="createPlayer = !createPlayer" id="create">
        Create Player
      </button>
    </div>
    <div>
      <h2>Roster</h2>
      <div class="roster head">
        <h3>Name</h3>
        <h3>#</h3>
        <h3>Pos</h3>
        <h3>B/T</h3>
        <h3>Team</h3>
      </div>
      <div class="roster" v-for="(player, index) in rosterData" :key="index">
        <p>{{ player.firstName }} {{ player.lastName }}</p>
        <p>{{ player.number }}</p>
        <p>{{ player.position }}</p>
        <p>{{ player.bats }}/{{ player.throws }}</p>
        <p>{{ player.teamName }}</p>
      </div>
    </div>
    <CreatePlayer v-if="createPlayer" @cancel="createPlayer = false" />
  </div>
</template>

<script>
import CreatePlayer from "@/components/CreatePlayer.vue";
import { serviceFactory } from "../services/factory";

const playersService = serviceFactory.get("players");

export default {
  name: "Players",
  components: {
    CreatePlayer,
  },
  data() {
    return {
      isLoading: false,
      rosterData: [],
      createPlayer: false,
    };
  },
  created() {
    console.log("in created");
    this.fetchPlayersData();
  },
  methods: {
    async fetchPlayersData() {
      this.isLoading = true;
      const { data } = await playersService.get();
      this.isLoading = false;
      this.rosterData = data;
      console.log("rosterData", this.rosterData);
    },
  },
};
</script>

<style scoped>

.roster {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
  width: 50%;
}
</style>

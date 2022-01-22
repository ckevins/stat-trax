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
      <div class="roster player" v-for="(player, index) in rosterData" :key="index" @click="viewPlayerCard(player)">
        <p>{{ player.firstName }} {{ player.lastName }}</p>
        <p>{{ player.number }}</p>
        <p>{{ player.position }}</p>
        <p>{{ player.bats }}/{{ player.throws }}</p>
        <p>{{ player.teamName }}</p>
      </div>
    </div>
    <RecordGame v-if="recordGame" :players=rosterData @cancel="recordGame = false" />
    <CreatePlayer v-if="createPlayer" @cancel="createPlayer = false" @close="fetchPlayersData()"/>
    <PlayerCard v-if="playerCard" :player=playerCard @cancel="playerCard = null" />
  </div>
</template>

<script>
import RecordGame from "@/components/PlayerRecordGame.vue"
import CreatePlayer from "@/components/CreatePlayer.vue";
import PlayerCard from "@/components/PlayerCard.vue";
import { serviceFactory } from "@/services/factory";

const playersService = serviceFactory.get("players");

export default {
  name: "Players",
  components: {
    RecordGame,
    CreatePlayer,
    PlayerCard
  },
  data() {
    return {
      isLoading: false,
      rosterData: [],
      createPlayer: false,
      recordGame: false,
      playerCard: null
    };
  },
  created() {
    console.log("in created");
    this.fetchPlayersData();
  },
  methods: {
    async fetchPlayersData() {
      this.isLoading = true;
      this.createPlayer = false;
      const { data } = await playersService.get();
      this.isLoading = false;
      this.rosterData = data;
      console.log("rosterData", this.rosterData);
    },
    viewPlayerCard(player) {
      this.playerCard = player
    }
  },
};
</script>

<style scoped>
.roster {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
  width: 50%;
}

.head {
  border-bottom: 2px solid black
}

.player {
  border-bottom: 1px solid gray;
}

.player:hover {
  cursor: pointer;
}

</style>

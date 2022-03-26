<template>
  <div class="players view">
    <h1 class="text-center text-5xl p-5">Players</h1>
    <div class="flex justify-between">
      <div class="basis-3/4 roster-div w-full">
        <div class="grid grid-cols-5 text-2xl font-bold header">
          <h3>Name</h3>
          <h3>#</h3>
          <h3>Pos</h3>
          <h3>B/T</h3>
          <h3>Team</h3>
        </div>
        <div
          class="grid grid-cols-5 player"
          v-for="(player, index) in rosterData"
          :key="index"
          @click="viewPlayerCard(player)"
        >
          <p>{{ player.firstName }} {{ player.lastName }}</p>
          <p>{{ player.number }}</p>
          <p>{{ player.position }}</p>
          <p>{{ player.bats }}/{{ player.throws }}</p>
          <p>{{ player.teamName }}</p>
        </div>
      </div>
      <ActionToolbar
        :actions="actions"
        @create-player="createPlayer = !createPlayer"
      />
    </div>
    <CreatePlayer
      v-if="createPlayer"
      @cancel="createPlayer = false"
      @close="fetchPlayersData()"
    />
    <PlayerCard
      v-if="playerCard"
      :player="playerCard"
      @cancel="playerCard = null"
    />
  </div>
</template>

<script>
import ActionToolbar from "../components/ActionToolbar.vue";
import CreatePlayer from "../components/CreatePlayer.vue";
import PlayerCard from "../components/PlayerCard.vue";
import { serviceFactory } from "../services/factory";

const playersService = serviceFactory.get("players");

export default {
  name: "Players",
  components: {
    ActionToolbar,
    CreatePlayer,
    PlayerCard,
  },
  data() {
    return {
      isLoading: false,
      actions: [
        { text: "Create Player", action: "create-player" },
        { text: "Record Game", action: "record-game" },
      ],
      rosterData: [],
      createPlayer: false,
      recordGame: false,
      playerCard: null,
    };
  },
  created() {
    this.fetchPlayersData();
  },
  methods: {
    async fetchPlayersData() {
      this.isLoading = true;
      this.createPlayer = false;
      const { data } = await playersService.get();
      this.isLoading = false;
      this.rosterData = data;
    },
    viewPlayerCard(player) {
      this.playerCard = player;
    },
  },
};
</script>

<style scoped>
.header {
  border-bottom: 2px solid black;
}

.player {
  border-bottom: 1px solid lightgray
}

.player:hover {
  cursor: pointer;
  background-color: gainsboro;
}
</style>

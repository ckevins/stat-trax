<template>
  <div class="players view">
    <h1>Players</h1>
    <ActionToolbar
      :actions="actions"
      @create-player="createPlayer = !createPlayer"
    />
    <!-- <div class="actions">
      <button @click="createPlayer = !createPlayer" id="create">
        Create Player
      </button>
    </div> -->
    <div class="roster-div">
      <h2>Roster</h2>
      <div class="roster head">
        <h3>Name</h3>
        <h3>#</h3>
        <h3>Pos</h3>
        <h3>B/T</h3>
        <h3>Team</h3>
      </div>
      <div
        class="roster player"
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
import ActionToolbar from "@/components/ActionToolbar.vue";
import CreatePlayer from "@/components/CreatePlayer.vue";
import PlayerCard from "@/components/PlayerCard.vue";
import { serviceFactory } from "@/services/factory";

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
.roster-div {
  margin-bottom: 40px;
}

.roster {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
  width: 50%;
  padding-left: 20px;
}

.head {
  border-bottom: 2px solid black;
}

.player {
  border-bottom: 1px solid gray;
}

.player:hover {
  cursor: pointer;
  background-color: gainsboro;
}
</style>

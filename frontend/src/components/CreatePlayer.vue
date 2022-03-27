<template>
  <div class="create-player m-3">
    <h1 class="text-center text-4xl p-5">{{ heading }}</h1>
    <div v-if="submission" class="component-text">
      <h2>
        {{ submission.firstName }} {{ submission.lastName }}
        {{ submission.number }}
      </h2>
      <h3>{{ submission.position }}</h3>
      <h4>{{ submission.bats }} / {{ submission.throws }}</h4>
      <h4>{{ submission.teamName }}</h4>
    </div>
    <div v-else class="m-2">
      <div class="flex justify-between my-3">
        <label>First Name:</label>
        <input type="text" v-model="player.firstName" />
      </div>
      <div class="flex justify-between my-3">
        <label>Last Name:</label>
        <input type="text" v-model="player.lastName" />
      </div>
      <div class="flex justify-between my-3">
        <label>Number:</label>
        <input
          type="number"
          id="number"
          min="00"
          max="99"
          v-model="player.number"
        />
      </div>
      <div class="flex justify-between my-3">
        <label>Position:</label>
        <select id="position" value="null" v-model="player.position">
          <option>--</option>
          <option v-for="(position, index) in positions" :key="index">
            {{ position }}
          </option>
        </select>
      </div>
      <div class="flex justify-between my-3">
        <label>Bats:</label>
        <select id="bats" value="null" v-model="player.bats">
          <option>--</option>
          <option v-for="(bat, index) in bats" :key="index">
            {{ bat }}
          </option>
        </select>
      </div>
      <div class="flex justify-between my-3">
        <label>Throws:</label>
        <select id="throws" value="null" v-model="player.throws">
          <option>--</option>
          <option v-for="(hand, index) in throws" :key="index">
            {{ hand }}
          </option>
        </select>
      </div>
      <div class="flex justify-between my-3">
        <label>Team Name:</label>
        <input type="text" v-model="player.teamName" />
      </div>
    </div>
    <ActionToolbar
      :actions="actions"
      @cancel="$emit('cancel')"
      @submit="submitPlayer"
      @close="$emit('close')"
    />
  </div>
</template>

<script>
import ActionToolbar from "../components/ActionToolbar.vue";
import { serviceFactory } from "../services/factory";

const playersService = serviceFactory.get("players");

export default {
  name: "CreatePlayer",
  components: {
    ActionToolbar,
  },
  data() {
    return {
      heading: "Create Player",
      actions: [
        { text: "Cancel", action: "cancel" },
        { text: "Submit", action: "submit" },
      ],
      isPosting: false,
      positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"],
      bats: ["R", "L", "S"],
      throws: ["R", "L"],
      player: {
        firstName: "",
        lastName: "",
        number: null,
        position: null,
        bats: null,
        throws: null,
        teamName: "",
      },
      submission: undefined,
    };
  },
  methods: {
    async submitPlayer() {
      this.isPosting = true;
      const { data } = await playersService.post(this.player);
      this.isPosting = false;
      this.submission = data;
      this.heading = "Player Created";
      this.actions = [{ text: "Close", action: "close" }];
      console.log("Submitted:", data);
    },
  },
};
</script>

<style scoped>
.create-player {
  background-color: #3f6b3f;
  border-radius: 10px;
}

h1, label {
  color: white;
}
</style>
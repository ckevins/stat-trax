<template>
  <div class="full-component">
    <div v-if="submission" class="component-text">
      <h1>Player Created!</h1>
      <h2>
        {{ submission.firstName }} {{ submission.lastName }}
        {{ submission.number }}
      </h2>
      <h3>{{ submission.position }}</h3>
      <h4>{{ submission.bats }} / {{ submission.throws }}</h4>
      <h4>{{ submission.teamName }}</h4>
      <div class="actions">
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
    <div v-else class="component-text">
      <h1>Create Player</h1>
      <div class="field">
        <label>First Name:</label>
        <input type="text" v-model="player.firstName" />
      </div>
      <div class="field">
        <label>Last Name:</label>
        <input type="text" v-model="player.lastName" />
      </div>
      <div class="field">
        <label>Number:</label>
        <input
          type="number"
          id="number"
          min="00"
          max="99"
          v-model="player.number"
        />
      </div>
      <div class="field">
        <label>Position:</label>
        <select id="position" value="null" v-model="player.position">
          <option>--</option>
          <option v-for="(position, index) in positions" :key="index">
            {{ position }}
          </option>
        </select>
      </div>
      <div class="field">
        <label>Bats:</label>
        <select id="bats" value="null" v-model="player.bats">
          <option>--</option>
          <option v-for="(bat, index) in bats" :key="index">
            {{ bat }}
          </option>
        </select>
      </div>
      <div class="field">
        <label>Throws:</label>
        <select id="throws" value="null" v-model="player.throws">
          <option>--</option>
          <option v-for="(hand, index) in throws" :key="index">
            {{ hand }}
          </option>
        </select>
      </div>
      <div class="field">
        <label>Team Name:</label>
        <input type="text" v-model="player.teamName" />
      </div>
      <ActionToolbar
        :actions="actions"
        @cancel="$emit('cancel')"
        @submit="submitPlayer"
      />
    </div>
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
      console.log("Submitted:", data);
    },
  },
};
</script>

<style scoped>
.field {
  width: 25%;
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 10px 0;
}

#number,
#position,
#bats,
#throws {
  width: 30%;
}
</style>
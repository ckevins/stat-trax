<template>
  <div class="create-player">
    <h1>Create Player</h1>
    <div class="field">
      <label>First Name:</label>
      <input type="text" value="" v-model="player.firstName"/>
    </div>
    <div class="field">
      <label>Last Name:</label>
      <input type="text" value="" v-model="player.lastName"/>
    </div>
    <div class="field">
      <label>Number:</label>
      <input type="number" id="number" min="00" max="99" value="null" v-model="player.number" />
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
      <input type="text" value="" v-model="player.teamName"/>
    </div>
    <div class="actions">
      <button @click="$emit('cancel')">Cancel</button>
      <button>Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreatePlayer",
  data() {
    return {
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
        teamName: ""
      },
    };
  },
};
</script>

<style scoped>
.create-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  padding: 5px 20px;
  border: 1px solid rgb(0, 31, 0);
  background-color: white;
  color: black;
  border-radius: 40px
}

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
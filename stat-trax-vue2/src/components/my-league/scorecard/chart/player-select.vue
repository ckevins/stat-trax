<template>
  <div class="player-selects cell">
    <h5>{{ row }}.</h5>
    <div class="player-selects-children">
      <select
        name="player"
        class="player-box"
        v-model="team.lineup[row - 1].starter"
        @change="updateData"
      >
        <option value="">--Starter--</option>
        <option
          v-for="player in team.info.roster"
          :value="player"
          :key="player"
        >
          {{ player }}
        </option>
      </select>
      <br />
      <select
        name="sub"
        class="player-box"
        v-model="team.lineup[row - 1].sub"
        @change="updateData"
      >
        <option value="">--Sub--</option>
        <option
          v-for="player in team.info.roster"
          :value="player"
          :key="player"
        >
          {{ player }}
        </option>
      </select>
      <br />
      <select
        name="position"
        class="pos-box"
        v-model="team.lineup[row - 1].position"
        @change="updateData"
      >
        <option value="">--Pos--</option>
        <option v-for="position in positions" :value="position" :key="position">
          {{ position }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerSelect",
  props: {
    team: Object,
    row: Number
  },
  data() {
    return {
      positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"],
    };
  },
  methods: {
    updateData() {
      this.$emit("update-teams-data", this.teamData);
    },
  }
};
</script>

<style scoped>
.cell {
  margin: 2px;
}

.player-selects {
  width: 15%;
  padding: 5px;
}

.player-selects {
  background-color: white;
  border: 1px solid navy;
}

.player-box {
  width: 100%;
  padding: 5px 0;
  margin: 3px 0;
}

.pos-box {
  padding: 5px 0;
  margin: 3px 0;
}
</style>
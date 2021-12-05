<template>
  <div class="new-player">
    <h2>New Player</h2>
    <div class="form">
    <div class="top-row">
      <input
        id="name-input"
        type="text"
        placeholder="Player Name"
        v-model="playerName"
      />
      <select id="position-select" v-model="pos">
        <option value="">Position</option>
        <option v-for="pos in positions" :key="pos" :value="pos">
          {{ pos }}
        </option>
      </select>
      <select id="number-select" v-model="number">
          <option value="">#</option>
          <option v-for="value in 99" :key="value" :value="value">{{ value }}</option>
      </select>
    </div>
      <br />
      <input id="team-name" text="text" placeholder="Team" v-model="team" />
    </div>
    <button id="submit" @click="submitPlayer(playerName, pos, number, team)">
        Submit
      </button>
  </div>
</template>

<script>

export default {
  name: "NewPlayer",
  data() {
    return {
      playerName: "",
      pos: "",
      number: "",
      team: "",
      positions: ["P", "C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "DH"],
    };
  },
};
</script>

<style scoped>
input, select {
    border: 1px solid gray;
    border-radius: 5px;
    padding: 5px;
}

.new-player {
  width: 98%;
  min-height: 55vh;
  margin: -5px auto 20px auto;
  border-radius: 10px;
  background-color: #4d926d;
  padding: 10px 0 30px 0;
  border: 5px solid #1e392a;
}

.form {
    padding: 2.5%;
  background-color: white;
  width: 45%;
  border: 2px solid #1e392a;
  border-radius: 30px;
  margin: 10px;
}

.top-row {
    width: 95%;
    display: flex;
    justify-content: space-between;
}

#submit {
  width: 45%;
  margin: 10px;
  border-radius: 10px 100px / 120px;
  font-weight: bold;
  background-color: #1e392a;
  border: 1px solid #4d926d;
}
</style>
<template>
  <div>
    <label>Inning: </label>
    <select v-model="atBat.inning" @change="update">
      <option v-for="index in 18" :key="index" :value="index">
        {{ index }}
      </option>
    </select>
    <div class="diamond">
      <img :src="imageSrc" />
      <select class="result" v-model="atBat.result" @change="update">
        <option value="">--</option>
        <option v-for="(result, index) in results" :key="index">
          {{ result }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
const noBase = require("../assets/diamond.jpg");
// const first = require("../assets/diamond-rp1.jpg");
// const second = require("../assets/diamond-rp2.jpg");
// const third = require("../assets/diamond-rp3.jpg");
// const home = require("../assets/diamond-rp4.jpg");

export default {
  name: "RecordGameDiamond",
  data() {
    return {
      atBat: {
        result: "",
        inning: 0,
        rbi: 0,
        sb: 0,
        cs: 0,
        runnerProgress: 0,
        balls: 0,
        strikes: 0,
      },
      imageSrc: noBase,
      results: [
        "1B",
        "2B",
        "3B",
        "HR",
        "K",
        "Kc",
        "BB",
        "IBB",
        "4-3",
        "5-3",
        "6-3",
        "3U",
        "2-3",
        "1-3",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "F8",
        "F9",
        "L1",
        "L3",
        "L4",
        "L5",
        "L6",
        "FC",
        "6-4-3",
        "4-6-3",
        "5-4-3",
        "3-6-1",
        "3-6-3",
        "1-6-3",
        "1-4-3",
      ],
    };
  },
  methods: {
    update() {
      this.$emit("update", this.atBat);
    },
  },
};
</script>

<style scoped>
.diamond {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

img {
  width: 100%;
}

.result {
  z-index: 10;
  position: absolute;
  width: 30%;
  height: 20%;
}
</style>
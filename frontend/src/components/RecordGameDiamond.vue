<template>
  <div>
    <div class="inning">
      <label>Inning: </label>
      <select id="inning" v-model="atBat.inning" @change="update">
        <option v-for="index in 18" :key="index" :value="index">
          {{ index }}
        </option>
      </select>
    </div>
    <div class="diamond">
      <img :src="imageSrc" />
      <select class="result" v-model="atBat.result" @change="update">
        <option v-for="(result, index) in results" :key="index">
          {{ result }}
        </option>
      </select>
    </div>
    <div class="balls-strikes">
      <div class="balls">
        <label>B</label>
        <input type="button" :class="checkClass(1, 'balls')" @click="setCount(1, 'balls')" />
        <input type="button" :class="checkClass(2, 'balls')" @click="setCount(2, 'balls')" />
        <input type="button" :class="checkClass(3, 'balls')" @click="setCount(3, 'balls')" />
      </div>
      <div class="strikes">
        <label>S</label>
        <input type="button" :class="checkClass(1, 'strikes')" @click="setCount(1, 'strikes')" />
        <input type="button" :class="checkClass(2, 'strikes')" @click="setCount(2, 'strikes')" />
      </div>
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
        result: null,
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
    setCount(value, ballOrStrike) {
      this.atBat[ballOrStrike] = value;
    },
    checkClass(value, ballOrStrike) {
      if (this.atBat[ballOrStrike] >= value) {
        return "count-button active"
      }
      return "count-button"
    },
    update() {
      this.$emit("update", this.atBat);
    },
  },
};
</script>

<style scoped>
.inning {
  width: 50%;
  margin: auto;
  text-align: center;
}

label,
select {
  font-size: 2em;
}

#inning {
  height: 50px;
}

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

.balls-strikes {
  width: 50%;
  margin: auto;
}

.balls, .strikes {
  width: 100%;
  display: flex;
  align-items: center;
}

.count-button {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  border: 2px solid black;
  margin: 10px;
}


.active {
  background-color: red;
}
</style>
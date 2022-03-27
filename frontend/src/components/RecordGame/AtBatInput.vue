<template>
  <div class="box">
    <div class="header">
      <label>Inning: </label>
      <select id="inning" v-model="atBat.inning" @change="update">
        <option value="0">--</option>
        <option v-for="index in 18" :key="index" :value="index">
          {{ index }}
        </option>
      </select>
      <div class="flex justify-between m-1">
        <div>
          <div class="flex items-center">
            <p>B</p>
            <FillDot
              :fill="checkFill(1, 'balls')"
              @click="setCount(1, 'balls')"
            />
            <FillDot
              :fill="checkFill(2, 'balls')"
              @click="setCount(2, 'balls')"
            />
            <FillDot
              :fill="checkFill(3, 'balls')"
              @click="setCount(3, 'balls')"
            />
          </div>
          <div class="flex items-center">
            <p>S</p>
            <FillDot
              :fill="checkFill(1, 'strikes')"
              @click="setCount(1, 'strikes')"
            />
            <FillDot
              :fill="checkFill(2, 'strikes')"
              @click="setCount(2, 'strikes')"
            />
          </div>
          <div class="flex items-center">
            <p>O</p>
            <FillDot
              :fill="checkFill(1, 'outs')"
              @click="setCount(1, 'outs')"
            />
            <FillDot
              :fill="checkFill(2, 'outs')"
              @click="setCount(2, 'outs')"
            />
          </div>
        </div>
        <div>
          <div>
            <select id="rbi" v-model="atBat.rbi" @change="update">
              <option value="0">0</option>
              <option v-for="index in 4" :key="index + 18" :value="index">
                {{ index }}
              </option>
            </select>
            <label>RBI</label>
          </div>
          <div>
            <select id="sb" v-model="atBat.sb" @change="update">
              <option value="0">0</option>
              <option v-for="index in 3" :key="index + 22" :value="index">
                {{ index }}
              </option>
            </select>
            <label>SB</label>
          </div>
          <div class="flex items-center">
            <FillDot
              :fill="checkFill(1, 'cs')"
              @click="setCount(1, 'cs')"
            />
            <p>CS</p>
          </div>
        </div>
      </div>
      <div>
        <p>Pitch:</p>
        <select v-model="atBat.pitchType">
          <option value="">-select-</option>
          <option
            v-for="(pitch, index) in pitchTypes"
            :key="index"
            :value="pitch"
          >
            {{ pitch }}
          </option>
        </select>
      </div>
    </div>
    <div class="diamond">
      <img :src="imageSrc" />
      <select
        class="result"
        v-model="atBat.result"
        @change="
          update();
          checkRunner();
        "
      >
        <option value="">--select--</option>
        <option v-for="(result, index) in results" :key="index">
          {{ result }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
// const noBase = require("../assets/diamond.jpg");
// const first = require("../assets/diamond-rp1.jpg");
// const second = require("../assets/diamond-rp2.jpg");
// const third = require("../assets/diamond-rp3.jpg");
// const home = require("../assets/diamond-rp4.jpg");
import FillDot from "../FillDot.vue";

export default {
  name: "AtBatInput",
  components: {
    FillDot,
  },
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
        outs: 0,
        pitchType: "",
      },
      imageSrc: "../src/assets/diamond.jpg",
      pitchTypes: [
        "4seam Fastball",
        "2seam Fastball",
        "Changeup",
        "Curveball",
        "Slider",
      ],
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
        "HBP",
      ],
    };
  },
  computed: {
    checkCaughtStealingClass() {
      if (this.atBat.cs === 1) {
        return "count-button active";
      }
      return "count-button";
    },
  },
  methods: {
    setCount(value, BallStrikeOutCS) {
      if (value === this.atBat[BallStrikeOutCS]) {
        this.atBat[BallStrikeOutCS] = 0;
        return;
      }
      this.atBat[BallStrikeOutCS] = value;
    },
    checkClass(value, BallStrikeOutCS) {
      if (this.atBat[BallStrikeOutCS] >= value) {
        return "count-button active";
      }
      return "count-button";
    },
    checkFill(value, BallStrikeOutCS) {
      if (this.atBat[BallStrikeOutCS] >= value) {
        return "gold";
      }
      return "white";
    },
    update() {
      this.$emit("update", this.atBat);
    },
    checkRunner() {
      switch (this.atBat.result) {
        case "1B":
        case "BB":
        case "IBB":
          this.atBat.runnerProgress = 1;
          this.imageSrc = first;
          break;
        case "2B":
          this.atBat.runnerProgress = 2;
          this.imageSrc = second;
          break;
        case "3B":
          this.atBat.runnerProgress = 3;
          this.imageSrc = third;
          break;
        case "HR":
          this.atBat.runnerProgress = 4;
          this.imageSrc = home;
          break;
        default:
          this.atBat.runnerProgress = 0;
          this.imageSrc = noBase;
      }
    },
  },
};
</script>

<style scoped>
.box {
  border: 3px solid black;
  margin: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.header {
  width: 100%;
  margin: auto;
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
</style>
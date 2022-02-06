<template>
  <div class="box">
    <div class="header">
      <label>Inning: </label>
      <select id="inning" v-model="atBat.inning" @change="update">
        <option value=0>--</option>
        <option v-for="index in 18" :key="index" :value="index">
          {{ index }}
        </option>
      </select>
      <div class="sub-header">
        <div class="balls-strikes">
          <div class="balls">
            <label>B</label>
            <input
              type="button"
              :class="checkClass(1, 'balls')"
              @click="setCount(1, 'balls')"
            />
            <input
              type="button"
              :class="checkClass(2, 'balls')"
              @click="setCount(2, 'balls')"
            />
            <input
              type="button"
              :class="checkClass(3, 'balls')"
              @click="setCount(3, 'balls')"
            />
          </div>
          <div class="strikes">
            <label>S</label>
            <input
              type="button"
              :class="checkClass(1, 'strikes')"
              @click="setCount(1, 'strikes')"
            />
            <input
              type="button"
              :class="checkClass(2, 'strikes')"
              @click="setCount(2, 'strikes')"
            />
          </div>
          <div class="outs">
            <label>O</label>
            <input
              type="button"
              :class="checkClass(1, 'outs')"
              @click="setCount(1, 'outs')"
            />
            <input
              type="button"
              :class="checkClass(2, 'outs')"
              @click="setCount(2, 'outs')"
            />
          </div>
        </div>
        <div class="rbi-sb-cs">
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
          <div>
            <input
              type="button"
              :class="checkClass(1, 'cs')"
              @click="setCount(1, 'cs')"
            />
            <label>CS</label>
          </div>
        </div>
      </div>
      <div>
        <label>Pitch:</label>
        <select v-model="atBat.pitchType">
          <option value="">-select-</option>
          <option v-for="(pitch, index) in pitchTypes" :key="index" :value=pitch >{{ pitch }}</option>
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
const noBase = require("../assets/diamond.jpg");
const first = require("../assets/diamond-rp1.jpg");
const second = require("../assets/diamond-rp2.jpg");
const third = require("../assets/diamond-rp3.jpg");
const home = require("../assets/diamond-rp4.jpg");

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
        outs: 0,
        pitchType: ""
      },
      imageSrc: noBase,
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
        "HBP"
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

.sub-header {
  display: flex;
  border: 1px solid darkblue;
  justify-content: space-between;
  padding: 0 2px;
}

.balls-strikes {
  border: 2px solid red;
  width: 50%;
}

.rbi-sb-cs {
  text-align: right;
  border: 2px solid blue;
  width: 50%;
}

.balls,
.strikes {
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
<template>
  <div class="diamond">
    <img v-if="!atBat" class="noAB" src="@/assets/diamond.jpg" />
    <img v-else :src="checkSource" />
    <div class="result" v-if="atBat">
      <h1>{{ atBat.result }}</h1>
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
  name: "GameLogDiamond",
  props: {
    atBat: Object,
  },
  computed: {
    checkSource() {
      let src;
      switch (this.atBat.runnerProgress) {
        case 0:
          src = noBase;
          break;
        case 1:
          src = first;
          break;
        case 2:
          src = second;
          break;
        case 3:
          src = third;
          break;
        case 4:
          src = home;
          break;
      }
      return src;
    },
  },
};
</script>

<style scoped>
.diamond {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

h1 {
  padding: 0;
  margin: 0;
}

img {
  width: 100%;
}

.noAB {
  opacity: 0.35;
}

.result {
  z-index: 10;
  position: absolute;
}
</style>
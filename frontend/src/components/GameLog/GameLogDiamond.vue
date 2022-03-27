<template>
  <div class="diamond">
    <img v-if="!atBat" class="noAB" src="../../assets/diamond.jpg" />
    <img v-else :src="'../src/assets/' + source" />
    <div class="result" v-if="atBat">
      <h1>{{ atBat.result }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameLogDiamond",
  props: {
    atBat: Object,
  },
  computed: {
    source() {
      let src;
      switch (this.atBat.runnerProgress) {
        case 0:
          src = "diamond.jpg";
          break;
        case 1:
          src = "diamond-rp1.jpg";
          break;
        case 2:
          src = "diamond-rp2.jpg";
          break;
        case 3:
          src = "diamond-rp3.jpg";
          break;
        case 4:
          src = "diamond-rp4.jpg";
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
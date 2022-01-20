<template>
  <div :class="checkClass()">
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
  methods: {
    checkClass() {
      let classString = "";
      if (!this.atBat) {
        classString = "diamond noAB";
      } else {
        switch (this.atBat.runnerProgress) {
          case 1:
            classString = "diamond first-base";
            break;
          case 2:
            classString = "diamond second-base";
            break;
          case 3:
            classString = "diamond third-base";
            break;
          case 4:
            classString = "diamond home";
            break;
          case 0:
            classString = "diamond no-base";
            break;
        }
      }
      return classString;
    },
  },
};
</script>

<style scoped>
.noAB {
  opacity: 0.5;
  background-image: url("~@/assets/diamond.jpg");
}

h1 {
  padding: 0;
  margin: 0;
}

.diamond {
  background-repeat: no-repeat;
  background-size: 150px 150px;
  background-position: center;
  position: relative;
  background-color: white;
  width: 150px;
  height: 150px;
}

.first-base {
  background-image: url("~@/assets/diamond-rp1.jpg");
}

.second-base {
  background-image: url("~@/assets/diamond-rp2.jpg");
}

.third-base {
  background-image: url("~@/assets/diamond-rp3.jpg");
}

.home {
  background-image: url("~@/assets/diamond-rp4.jpg");
}

.no-base {
  background-image: url("~@/assets/diamond.jpg");
}

.result {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
<template>
  <div class="diamond" :class="{ noAB: noAB }">
    <div class="first base" v-if="atBat && atBat.runnerProgress >= 1"></div>
    <div class="second base" v-if="atBat && atBat.runnerProgress >= 2"></div>
    <div class="third base" v-if="atBat && atBat.runnerProgress >= 3"></div>
    <div class="home" v-if="atBat && atBat.runnerProgress === 4">
      <div class="bottom"></div>
    </div>
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
    noAB() {
      if (this.atBat) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>

<style scoped>
.noAB {
  opacity: 0.5;
}

h1 {
  padding: 0;
  margin: 0;
}

.diamond {
  background-image: url("~@/assets/diamond.jpg");
  background-repeat: no-repeat;
  background-size: 150px 150px;
  background-position: center;
  position: relative;
  background-color: white;
  width: 150px;
  height: 150px;
}

.base {
  width: 13px;
  height: 13px;
  background-color: rgb(63, 107, 63);
  position: absolute;
  transform: rotate(45deg);
}

.rotate {
  transform: rotate(45deg);
}

.first,
.third {
  top: 45%;
}

.first {
  right: 9.5%;
}

.third {
  left: 9.5%;
}

.second {
  top: 10.25%;
  left: 45.5%;
}

.home {
  width: 12px;
  height: 8px;
  background-color: rgb(63, 107, 63);
  position: absolute;
  bottom: 11.5%;
  left: 46%;
}
.bottom {
  width: 8px;
  height: 8px;
  margin-top: 4px;
  margin-left: 2px;
  transform: rotate(45deg);
  background-color: rgb(63, 107, 63);
}

.result {
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
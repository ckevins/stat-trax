<template>
  <div class="stat-table">
    <div class="grid">
      <h3>AB</h3>
      <h3>H</h3>
      <h3>RBI</h3>
      <h3>R</h3>
    </div>
    <div class="grid">
      <p>{{ totals.ab }}</p>
      <p>{{ totals.h }}</p>
      <p>{{ totals.rbi }}</p>
      <p>{{ totals.r }}</p>
    </div>
    <div class="grid second-row">
      <h3>K</h3>
      <h3>BB</h3>
      <h3>HBP</h3>
      <h3>SB</h3>
    </div>
    <div class="grid">
      <p>{{ totals.k }}</p>
      <p>{{ totals.bb }}</p>
      <p>{{ totals.hbp }}</p>
      <p>{{ totals.sb }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameLogStatTable",
  props: {
    atBats: Array,
    updateKey: Number
  },
  data() {
    return {
      totals: {},
    };
  },
  watch: {
    updateKey: {
      handler() {
        console.log("handler running");
        this.calculateTotals();
      },
      immediate: true,
    },
  },
  methods: {
    calculateTotals() {
      console.log("Calculating...");
      let totals = {
        ab: 0,
        h: 0,
        rbi: 0,
        r: 0,
        k: 0,
        bb: 0,
        hbp: 0,
        sb: 0,
      };
      this.atBats.forEach((atBat) => {
        let result = atBat.result;
        if (result !== "BB" || result !== "HBP" || result !== "SAC") {
          totals.ab += 1;
        }
        if (
          result === "1B" ||
          result === "2B" ||
          result === "3B" ||
          result === "HR"
        ) {
          totals.h += 1;
        }
        if (result === "K" || result === "Kc") {
          totals.k += 1;
        } else if (result === "BB" || result === "IBB") {
          totals.bb += 1;
        } else if (result === "HBP") {
          totals.hbp += 1;
        }
        if (atBat.runnerProgress === 4) {
          totals.r += 1;
        }
        totals.rbi += atBat.rbi;
        totals.sb += atBat.sb;
      });
      this.totals = totals;
    },
  },
};
</script>

<style scoped>
h3,
p {
  margin: 0;
}

.stat-table {
  border: 2px solid black;
  margin: auto;
  width: 80%;
  text-align: center;
  font-size: 1.2em;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.second-row {
  border-top: 2px solid black;
}
</style>
<template>
  <div class="text-3xl">
    <div class="table rounded-lg">
      <div class="grid grid-cols-10 header rounded-t-md">
        <h1 class="font-bold">G</h1>
        <h1 class="font-bold">PA</h1>
        <h1 class="font-bold">AB</h1>
        <h1 class="font-bold">R</h1>
        <h1 class="font-bold">H</h1>
        <h1 class="font-bold">1B</h1>
        <h1 class="font-bold">2B</h1>
        <h1 class="font-bold">3B</h1>
        <h1 class="font-bold">HR</h1>
        <h1 class="font-bold">RBI</h1>
      </div>
      <div class="grid grid-cols-10 data">
        <p>{{ games.length }}</p>
        <p>{{ stats.PA }}</p>
        <p>{{ stats.AB }}</p>
        <p>{{ stats.R }}</p>
        <p>{{ stats.H }}</p>
        <p>{{ stats.singles }}</p>
        <p>{{ stats.doubles }}</p>
        <p>{{ stats.triples }}</p>
        <p>{{ stats.homeruns }}</p>
        <p>{{ stats.RBI }}</p>
      </div>
    </div>
    <div class="table rounded-lg">
      <div class="grid grid-cols-9 header rounded-t-md">
        <h1 class="font-bold">BA</h1>
        <h1 class="font-bold">OBP</h1>
        <h1 class="font-bold">SLG</h1>
        <h1 class="font-bold">OPS</h1>
        <h1 class="font-bold">BB</h1>
        <h1 class="font-bold">SO</h1>
        <h1 class="font-bold">TB</h1>
        <h1 class="font-bold">SB</h1>
        <h1 class="font-bold">CS</h1>
      </div>
      <div class="grid grid-cols-9 data">
        <p>{{ stats.BA }}</p>
        <p>{{ stats.OBP }}</p>
        <p>{{ stats.SLG }}</p>
        <p>{{ stats.OPS }}</p>
        <p>{{ stats.SB }}</p>
        <p>CS</p>
        <p>{{ stats.BB }}</p>
        <p>{{ stats.SO }}</p>
        <p>{{ stats.TB }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PlayerCardStatTable",
  props: {
    games: Array,
  },
  computed: {
    stats() {
      let stats = {
        PA: 0,
        AB: 0,
        R: 0,
        H: 0,
        singles: 0,
        doubles: 0,
        triples: 0,
        homeruns: 0,
        RBI: 0,
        SB: 0,
        CS: 0,
        BB: 0,
        HBP: 0,
        SO: 0,
        BA: 0,
        OBP: 0,
        SLG: 0,
        OPS: 0,
        TB: 0,
        SAC: 0,
      };
      this.games.forEach((game) => {
        game.atBats.forEach((atBat) => {
          stats.PA += 1;
          switch (atBat.result) {
            case "1B":
              stats.H += 1;
              stats.singles += 1;
              stats.AB += 1;
              stats.TB += 1;
              break;
            case "2B":
              stats.H += 1;
              stats.doubles += 1;
              stats.AB += 1;
              stats.TB += 2;
              break;
            case "3B":
              stats.H += 1;
              stats.triples += 1;
              stats.AB += 1;
              stats.TB += 3;
              break;
            case "HR":
              stats.H += 1;
              stats.homeruns += 1;
              stats.AB += 1;
              stats.TB += 4;
              break;
            case "K":
              stats.SO += 1;
              stats.AB += 1;
              break;
            case "BB":
              stats.BB += 1;
              break;
            case "HBP":
              stats.HBP += 1;
              break;
            case "SAC":
              stats.SAC += 1;
              break;
            default:
              stats.AB += 1;
          }
          if (atBat.runnerProgress === 4) {
            stats.R += 1;
          }
          stats.RBI += atBat.rbi;
          stats.SB += atBat.sb;
        });
      });
      stats.BA = (stats.H / stats.AB).toFixed(3).slice(1);
      stats.OBP = (
        (stats.H + stats.BB + stats.HBP) /
        (stats.AB + stats.BB + stats.HBP + stats.SAC)
      )
        .toFixed(3)
        .slice(1);
      stats.SLG = (stats.TB / stats.AB).toFixed(3);
      if (stats.SLG[0] == "0") {
        stats.SLG.toString.slice(1);
      }
      stats.OPS = (parseFloat(stats.OBP) + parseFloat(stats.SLG)).toFixed(3);
      return stats;
    },
  },
};
</script>

<style scoped>
.table {
  border: 1px solid #001d00;
  width: 100%;
  margin-bottom: 10px;
}

.header {
  background-color: #3f6b3f;
  color: white;
}

.header,
.data {
  padding-left: 5px;
}

.data {
  color: #001d00
}
</style>
<template>
  <div>
    <table>
      <thead>
        <th>G</th>
        <th>PA</th>
        <th>AB</th>
        <th>R</th>
        <th>H</th>
        <th>1B</th>
        <th>2B</th>
        <th>3B</th>
        <th>HR</th>
        <th>RBI</th>
        <th>SB</th>
        <th>CS</th>
        <th>BB</th>
        <th>SO</th>
        <th>BA</th>
        <th>OBP</th>
        <th>SLG</th>
        <th>OPS</th>
        <th>TB</th>
      </thead>
      <tbody>
        <td>{{ games.length }}</td>
        <td>{{ stats.PA }}</td>
        <td>{{ stats.AB }}</td>
        <td>{{ stats.R }}</td>
        <td>{{ stats.H }}</td>
        <td>{{ stats.singles }}</td>
        <td>{{ stats.doubles }}</td>
        <td>{{ stats.triples }}</td>
        <td>{{ stats.homeruns }}</td>
        <td>{{ stats.RBI }}</td>
        <td>{{ stats.SB }}</td>
        <td>CS</td>
        <td>{{ stats.BB }}</td>
        <td>{{ stats.SO }}</td>
        <td>{{ stats.BA }}</td>
        <td>{{ stats.OBP }}</td>
        <td>{{ stats.SLG }}</td>
        <td>{{ stats.OPS }}</td>
        <td>{{ stats.TB }}</td>
      </tbody>
    </table>
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
      stats.BA = (stats.H / stats.AB).toFixed(3);
      stats.OBP = (
        (stats.H + stats.BB + stats.HBP) /
        (stats.AB + stats.BB + stats.HBP + stats.SAC)
      ).toFixed(3);
      stats.SLG = (stats.TB / stats.AB).toFixed(3);
      stats.OPS = (parseFloat(stats.OBP) + parseFloat(stats.SLG)).toFixed(3);
      return stats;
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 50px 0;
  font-size: 2em;
}

th,
td {
  text-align: center;
  width: 5%;
  border: 1px solid gray;
}

th {
  background-color: gainsboro;
}
</style>
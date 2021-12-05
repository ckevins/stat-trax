<template>
  <div class="tally-container">
    <div class="tally-parent">
      <div
        v-for="tally in tallies"
        class="tally-child"
        id="starter-tally"
        :key="tally"
      >
        <h5>{{ tally }}</h5>
        <p>
          {{ getTallies(team.lineup[row - 1].atbats, false)[row] }}
        </p>
      </div>
    </div>
    <div class="tally-parent" v-if="team.lineup[row - 1].sub">
      <div
        v-for="tally in tallies"
        class="tally-child"
        id="sub-tally"
        :key="tally"
      >
        <h5>{{ tally }}</h5>
        <p>
          {{ getTallies(team.lineup[row - 1].atbats, true)[row] }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
const getAtBats = (atbats, subBool) => {
  let abs = 0;
  atbats.forEach((element) => {
    if (element.sub === subBool) {
      if (
        element.result !== null &&
        element.result !== "" &&
        element.result !== "BB" &&
        element.result !== "HBP" &&
        element.result !== "SF" &&
        element.result !== "SH"
      ) {
        abs += 1;
      }
    }
  });
  return abs;
};

const getResults = (atbats, subBool) => {
  let hits = 0;
  let bbs = 0;
  let hbps = 0;
  let ks = 0;
  atbats.forEach((element) => {
    if (element.sub === subBool) {
      if (
        element.result === "1B" ||
        element.result === "2B" ||
        element.result === "3B" ||
        element.result === "HR"
      ) {
        hits += 1;
      } else if (element.result === "BB") {
        bbs += 1;
      } else if (element.result === "K" || element.result === "Kc") {
        ks += 1;
      } else if (element.result === "HBP") {
        hbps += 1;
      }
    }
  });
  return [hits, bbs, hbps, ks];
};

const getRuns = (atbats, subBool) => {
  let runs = 0;
  atbats.forEach((element) => {
    if (element.sub === subBool) {
      if (element.runner === 4) {
        runs += 1;
      }
    }
  });
  return runs;
};

const getRbis = (atbats, subBool) => {
  let rbis = 0;
  atbats.forEach((element) => {
    if (element.sub === subBool) {
      if (element.rbi !== "0") {
        rbis += element.rbi;
      }
    }
  });
  return rbis;
};

export default {
  name: "Tally",
  props: {
    team: Object,
    row: Number,
  },
  data() {
    return {
      tallies: ["AB", "H", "R", "RBI", "BB", "HBP", "K"],
    };
  },
  methods: {
    getTallies(atbatsArr, subBool) {
      let abs = getAtBats(atbatsArr, subBool);
      let [hits, bbs, hbps, ks] = getResults(atbatsArr, subBool);
      let runs = getRuns(atbatsArr, subBool);
      let rbis = getRbis(atbatsArr, subBool);
      return [abs, hits, runs, rbis, bbs, hbps, ks];
    },
  },
};
</script>

<style scoped>
.tally-container {
  display: block;
  flex-grow: 2;
  margin: 2px;
}

.tally-parent {
  display: flex;
  height: 50%;
  margin: auto;
  justify-content: space-between;
}

.tally-child {
  border: 1px solid navy;
  flex: 1 0 auto;
  text-align: center;
  margin: 1px;
}

#starter-tally {
  background-color: white;
  margin: 0 1px 1px 1px;
}

#sub-tally {
  background-color: gainsboro;
  margin: 1px 1px 0 1px;
}
</style>
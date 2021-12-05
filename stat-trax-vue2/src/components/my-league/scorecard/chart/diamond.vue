<template>
  <div class="diamond cell">
    <div class="rbi">
      <select
        name="RBI"
        id="RBI-select"
        v-model="team.lineup[row - 1].atbats[inning - 1].rbi"
        v-on:change="updateData"
      >
        <option :value="0">-</option>
        <option v-for="index in 4" :value="index" :key="index">
          {{ index }}
        </option>
      </select>
      <label>RBI</label>
    </div>
    <div class="sb">
      <select
        name="SB"
        id="SB-select"
        v-model="team.lineup[row - 1].atbats[inning - 1].sb"
        v-on:change="updateData"
      >
        <option value="0">-</option>
        <option v-for="index in 3" :value="index" :key="index">
          {{ index }}
        </option>
      </select>
      <label>SB</label>
    </div>
    <div class="result">
      <select
        name="result"
        id="result-select"
        v-model="team.lineup[row - 1].atbats[inning - 1].result"
        v-on:change="
          resultUpdateRunner($event, row, inning);
          updateData;
        "
      >
        <option value=""></option>
        <option v-for="result in results" :value="result" :key="result">
          {{ result }}
        </option>
      </select>
    </div>
    <div
      class="note"
      v-if="team.lineup[row - 1].atbats[inning - 1].noteVisibility"
    >
      <input type="text" id="note-input" placeholder="Note" />
    </div>
    <div class="out-count">
      <select
        name="out-count"
        id="out-count-select"
        v-model="team.lineup[row - 1].atbats[inning - 1].out"
        v-on:change="updateData"
      >
        <option value="0">-</option>
        <option v-for="index in 3" :value="index" :key="index">
          {{ index }}
        </option>
      </select>
      <label>Out</label>
    </div>
    <button
      class="base-button"
      id="first-base"
      :style="checkButtonStyle(1, row, inning)"
      v-on:click="
        updateRunner(1, row, inning);
        updateData;
      "
    ></button>
    <button
      class="base-button"
      id="second-base"
      :style="checkButtonStyle(2, row, inning)"
      v-on:click="
        updateRunner(2, row, inning);
        updateData;
      "
    ></button>
    <button
      class="base-button"
      id="third-base"
      :style="checkButtonStyle(3, row, inning)"
      v-on:click="
        updateRunner(3, row, inning);
        updateData;
      "
    ></button>
    <button
      class="home-plate-button"
      id="home-plate"
      :style="checkButtonStyle(4, row, inning)"
      v-on:click="
        updateRunner(4, row, inning);
        updateData;
      "
    ></button>
    <div class="sub-box">
      <label for="sub-box">Sub:</label>
      <input
        type="checkbox"
        id="sub-box"
        v-model="team.lineup[row - 1].atbats[inning - 1].sub"
        v-on:change="updateData"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Diamond",
  props: {
    teamData: Object,
    row: Number,
    inning: Number,
  },
  data() {
    return {
      team: this.teamData,
      results: [
        "1B",
        "2B",
        "3B",
        "HR",
        "BB",
        "K",
        "Kc",
        "HBP",
        "G",
        "U",
        "F",
        "L",
        "FF",
        "FO",
        "DP",
        "FC",
        "SF",
        "SH",
        "E",
      ],
    };
  },
  methods: {
    updateData() {
      this.$emit("update-teams-data", this.team);
    },
    updateRunner(base, row_index, inning_index) {
      if (
        this.team.lineup[row_index - 1].atbats[inning_index - 1].runner ===
        base
      ) {
        this.team.lineup[row_index - 1].atbats[inning_index - 1].runner = 0;
      } else {
        this.team.lineup[row_index - 1].atbats[inning_index - 1].runner =
          base;
      }
    },
    resultUpdateRunner(event, row, inning) {
      let result = event.target.value;
      let atbat = this.team.lineup[row - 1].atbats[inning - 1];
      if (result === "1B" || result === "BB" || result === "HBP") {
        atbat.runner = 1;
        atbat.noteVisibility = false;
      } else if (result === "2B") {
        atbat.runner = 2;
        atbat.noteVisibility = false;
      } else if (result === "3B") {
        atbat.runner = 3;
        atbat.noteVisibility = false;
      } else if (result === "HR") {
        atbat.runner = 4;
        atbat.noteVisibility = false;
      } else if (result === "K" || result === "Kc" || result === "") {
        atbat.runner = 0;
        atbat.noteVisibility = false;
      } else {
        atbat.runner = 0;
        atbat.noteVisibility = true;
      }
    },
    checkButtonStyle(baseNum, row, inning_index) {
      if (
        this.team.lineup[row - 1].atbats[inning_index - 1].runner >= baseNum
      ) {
        return {
          backgroundColor: "red",
        };
      } else {
        return {
          backgroundColor: "white",
        };
      }
    },
  },
};
</script>

<style scoped>
select, input {
    border: 1px solid gray;
    border-radius: 5px;
}

.diamond {
  position: relative;
  background-color: white;
  width: 200px;
  height: 150px;
  background-image: url("~@/assets/diamond.jpg");
  background-repeat: no-repeat;
  background-size: 150px 150px;
  background-position: center;
}

.rbi {
  padding: 5px;
}

.sb {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
}

.result {
  position: absolute;
  top: 35%;
  left: 30%;
}

#result-select {
  font-size: 1.2em;
  width: 80px;
  text-align-last: center;
}

.out-count {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 5px;
}

.sub-box {
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 5px;
}

.base-button {
  height: 15px;
  width: 15px;
  transform: rotate(45deg);
}

#first-base {
  position: absolute;
  top: 45%;
  right: 19%;
}

#second-base {
  position: absolute;
  top: 9.5%;
  left: 46%;
}

#third-base {
  position: absolute;
  top: 45%;
  left: 19%;
}

.home-plate-button {
  height: 15px;
  width: 15px;
  position: absolute;
  bottom: 9.5%;
  left: 46%;
}

#note-input {
  width: 50px;
  position: absolute;
  top: 55%;
  left: 35%;
  text-align: center;
}
</style>
<template>
  <div class="scorecard">
    <Help v-if="help" :toggleHelp="toggleHelp"></Help>
    <h2>Scorecard</h2>
    <button v-on:click="toggleHelp" id="help-button">Help</button>
    <Header
      :teams="sampleTeams"
      :gameData="gameData"
      @update-game-data="updateGameData"
    >
    </Header>
    <div
      class="boxscore-div"
      v-if="gameData.homeTeam.info.nickname && gameData.awayTeam.info.nickname"
    >
      <button
        class="team-button"
        :style="checkTeamButtonStyle('away')"
        v-on:click="awayButton"
      >
        Away
      </button>
      <Boxscore class="boxscore" :gameData="gameData"></Boxscore>
      <button
        class="team-button"
        :style="checkTeamButtonStyle('home')"
        v-on:click="homeButton"
      >
        Home
      </button>
    </div>
    <div class="team-select-buttons"></div>
    <Chart
      v-if="gameData.homeTeam.info.nickname && gameData.awayTeam.info.nickname"
      :gameData="gameData"
      :activeTeam="activeTeam"
      :inningsRendered="inningsRendered"
      :toggleUp="toggleInningRangeUp"
      :toggleDown="toggleInningRangeDown"
      @update-team-data="updateGameData"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import Help from "@/components/my-league/scorecard/help.vue";
import Header from "@/components/my-league/scorecard/header.vue";
import Boxscore from "@/components/my-league/scorecard/boxscore.vue";
import Chart from "@/components/my-league/scorecard/chart/chart-container.vue";

class ABData {
  constructor() {
    this.rbi = 0;
    this.sb = 0;
    this.result = "";
    this.note = null;
    this.noteVisibility = false;
    this.out = 0;
    this.runner = 0;
    this.sub = false;
  }
}

class playerGameData {
  constructor() {
    this.starter = "";
    this.position = "";
    this.sub = "";
    this.atbats = [
      new ABData(),
      new ABData(),
      new ABData(),
      new ABData(),
      new ABData(),
      new ABData(),
      new ABData(),
      new ABData(),
      new ABData(),
      new ABData(),
    ];
  }
}

export default {
  name: "Scorecard",
  components: {
    Help,
    Header,
    Boxscore,
    Chart,
  },
  data: function () {
    return {
      sampleTeams: [
        {
          nickname: "Ryes",
          style: {
            backgroundColor: "teal",
            color: "white",
          },
          roster: [
            "Noah Echols",
            "Steve Wyre",
            "Matt Peterson",
            "Seamus Bourne",
            "Jason Pulley",
            "Cody Evins",
            "Ryan Silver",
            "Tomo Yamahara",
            "Andrew Daniels",
          ],
        },
        {
          nickname: "Red Sox",
          style: {
            backgroundColor: "red",
            color: "white",
          },
          roster: [
            "Alan Benes",
            "Christopher Douglas",
            "Evan Franklin",
            "Gregory Hughes",
            "Ian Jackson",
            "Kenneth Lewis",
            "Michael Nicholson",
            "Oscar Pena",
            "Quinn Rothschild",
          ],
        },
        {
          nickname: "Giants",
          style: {
            backgroundColor: "orange",
            color: "black",
          },
          roster: [
            "Austin Blackwell",
            "Colby Donaldson",
            "Elijah Figs",
            "Gene Holmes",
            "Ignacio Juarez",
            "Kent Longbottom",
            "Mitch Newell",
            "Oliver Perez",
            "Quentin Rollins",
          ],
        },
      ],
      help: false,
      inningsRange: 0,
      activeTeam: "awayTeam",
      gameData: {
        date: "",
        time: "",
        weather: "",
        homeTeam: {
          info: {},
          lineup: [
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
          ],
        },
        awayTeam: {
          info: {},
          lineup: [
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
            new playerGameData(),
          ],
        },
      },
    };
  },
  computed: {
    inningsRendered() {
      let range = this.inningsRange;
      return [range + 1, range + 2, range + 3];
    },
  },
  methods: {
    toggleHelp() {
      if (this.help === false) {
        this.help = true;
      } else {
        this.help = false;
      }
    },
    updateGameData(gameData) {
      this.gameData = gameData;
    },
    checkTeamButtonStyle(homeOrAway) {
      if (this.activeTeam === homeOrAway) {
        return {
          border: "5px solid yellow",
          fontWeight: "bold",
        };
      } else {
        return {
          border: "1px solid black",
        };
      }
    },
    homeButton() {
      this.activeTeam = "homeTeam";
    },
    awayButton() {
      this.activeTeam = "awayTeam";
    },
    toggleInningRangeDown() {
      if (this.inningRange !== 0) {
        this.inningRange -= 1;
      }
    },
    toggleInningRangeUp() {
      if (this.inningRange !== 5) {
        this.inningRange += 1;
      }
    },
  },
};
</script>

<style>
h2,
.app-header {
  text-align: center;
  color: white;
}

#help-button {
  height: 50px;
  width: 50px;
  position: absolute;
  top: 15px;
  right: 15px;
}
.scorecard {
  width: 98%;
  min-height: 55vh;
  position: relative;
  background-color: #4d926d;
  padding: 10px 0 30px 0;
  border: 5px solid #1e392a;
  margin: -5px auto 20px auto;
  border-radius: 10px;
  color: black;
}

.boxscore-div {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: center;
}

.boxscore {
  flex-grow: 1.5;
}

.team-button {
  background-color: white;
  width: 10%;
  margin: 10px;
  border-radius: 100%;
  font-size: 2em;
}

.team-button:hover {
  background-color: rgb(189, 189, 189);
}

#help-button {
  background-color: white;
  border: 1px solid #1e392a;
  border-radius: 5px;
}
</style>

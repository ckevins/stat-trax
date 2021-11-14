<template>
    <div class='scorecard'>
            <Help v-if='help' :toggleHelp='toggleHelp'></Help>
            <h2>Scorecard</h2>
            <button v-on:click='toggleHelp' id='help-button'>Help</button>
            <ScorecardHeader 
                :teams='teams' 
                @update-game-data='updateGameData'>
            </ScorecardHeader>
            <div class='boxscore-div' v-if='gameData.homeTeam.nickname && gameData.awayTeam.nickname'>
                <button class='team-button' :style='checkTeamButtonStyle("away")' v-on:click='awayButton'>Away</button>
                <Boxscore 
                    class='boxscore'
                    :homeTeamNickname='gameData.homeTeam.nickname'
                    :homeTeamData='homeTeamData'
                    :awayTeamNickname='gameData.awayTeam.nickname'
                    :awayTeamData='awayTeamData'>
                </Boxscore>
                <button class='team-button' :style='checkTeamButtonStyle("home")' v-on:click='homeButton'>Home</button>
            </div>
            <div class='team-select-buttons'>
            </div>
            <ScorecardChart
                v-if="gameData.homeTeam.nickname && activeTeam==='home'"
                :team="gameData.homeTeam"
                :gameData="homeTeamData"
                :inningsRendered='inningsRendered'
                :toggleUp='toggleInningRangeUp'
                :toggleDown='toggleInningRangeDown'
                @update-team-data='updateHomeTeamData'>
            </ScorecardChart>
            <ScorecardChart
                v-if="gameData.awayTeam.nickname && activeTeam==='away'"
                :team="gameData.awayTeam"
                :gameData="awayTeamData"
                :inningsRendered='inningsRendered'
                :toggleUp='toggleInningRangeUp'
                :toggleDown='toggleInningRangeDown'
                @update-team-data='updateAwayTeamData'>
            </ScorecardChart>
    </div>
</template>

<script>
// @ is an alias to /src
import Help from '@/components/help.vue';
import ScorecardHeader from '@/components/scorecard-header.vue';  
import Boxscore from '@/components/boxscore.vue';  
import ScorecardChart from '@/components/scorecard-chart.vue';



class ABData {
    constructor () {
        this.rbi = 0;
        this.sb = 0;
        this.result = '';
        this.note = null;
        this.noteVisibility = false;
        this.out = 0;
        this.runner = 0;
        this.sub = false;
    }
}

class playerGameData {
    constructor () {
        this.starter = '';
        this.position = '';
        this.sub = '';
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
            new ABData()
        ];
    }
}

export default {
  name: 'Scorecard',
  components: {
        Help,
        ScorecardHeader,
        Boxscore,
        ScorecardChart
  },
  data: function () {
    return {
      teams: [
      {
          nickname: 'Southern Ryes',
          roster: [
          'Noah Echols', 
          'Steve Wyre', 
          'Matt Peterson', 
          'Seamus Bourne', 
          'Jason Pulley', 
          'Cody Evins', 
          'Ryan Silver',
          'Tomo Yamahara',
          'Andrew Daniels']
      },
      {
          nickname: 'Red Sox',
          roster: [
          'Alan Benes',
          'Christopher Douglas',
          'Evan Franklin',
          'Gregory Hughes',
          'Ian Jackson',
          'Kenneth Lewis',
          'Michael Nicholson',
          'Oscar Pena',
          'Quinn Rothschild'
          ]
      },
      {
          nickname: 'Giants',
          roster: [
          'Austin Blackwell',
          'Colby Donaldson',
          'Elijah Figs', 
          'Gene Holmes',
          'Ignacio Juarez',
          'Kent Longbottom',
          'Mitch Newell',
          'Oliver Perez',
          'Quentin Rollins'
          ]
      }
      ],         
      help: false,
      gameData: {
          homeTeam: {},
          awayTeam: {},
          date: '',
          time: '',
          weather: ''
      },
      inningRange: 0,
      activeTeam: 'away',
      homeTeamData: {
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
              new playerGameData()
          ]
      },
      awayTeamData: {
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
              new playerGameData()
          ]
      }

    }
  },
  methods: {
        toggleHelp: function () {
          if (this.help === false) {
              this.help = true;
          } else {
              this.help = false;
          }
        },
        updateGameData: function (gameData) {
            this.gameData = gameData;
        },
        updateHomeTeamData: function (teamData) {
            this.homeTeamData = teamData
        },
        updateAwayTeamData: function (teamData) {
            this.awayTeamData = teamData
        },
        checkTeamButtonStyle: function (homeOrAway) {
            if (this.activeTeam === homeOrAway) {
                return {
                    border: "5px solid yellow",
                    fontWeight: "bold"
                }
            } else {
                return {
                    border: "1px solid black"
                }
            }
        },
        homeButton: function () {
            this.activeTeam = 'home';
        },
        awayButton: function () {
            this.activeTeam = 'away';
        },
        toggleInningRangeDown: function () {
            if(this.inningRange !== 0) {
                this.inningRange -= 1;
            }
        },
        toggleInningRangeUp: function () {
            if(this.inningRange !== 5) {
                this.inningRange += 1;
            }
        }
  },
  computed: {
        inningsRendered: function () {
            let range = this.inningRange;
            return [range + 1, range + 2, range + 3, range + 4, range +5]
        }
  }
    
}
</script>

<style scoped>
h2, .app-header {
    text-align: center;
    color: white
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
    border: 5px solid #1E392A;
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


</style>

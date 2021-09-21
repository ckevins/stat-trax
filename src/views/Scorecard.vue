<template>
    <div class='scorecard'>
            <Help v-if='help' :toggleHelp='toggleHelp'></Help>
            <h2>Scorecard</h2>
            <button v-on:click='toggleHelp' id='help-button'>Help</button>
            <ScorecardHeader 
                :teams='teams' 
                @update-game-data='updateGameData'>
            </ScorecardHeader>
            <div class='team-select-buttons'>
                <button class='team-button' :style='checkTeamButtonStyle("away")' v-on:click='awayButton'>Away</button>
                <button class='team-button' :style='checkTeamButtonStyle("home")' v-on:click='homeButton'>Home</button>
            </div>
            <Boxscore 
                v-if='gameData.homeTeam.nickname && gameData.awayTeam.nickname'
                :homeTeamNickname='gameData.homeTeam.nickname'
                :homeTeamData='homeTeamData'
                :awayTeamNickname='gameData.awayTeam.nickname'
                :awayTeamData='awayTeamData'>
            </Boxscore>
            <ScorecardChart
                v-if="gameData.homeTeam.nickname && activeTeam==='home'"
                :roster="gameData.homeTeam"
                :team="homeTeamData"
                :inningsRendered='inningsRendered'
                :toggleUp='toggleInningRangeUp'
                :toggleDown='toggleInningRangeDown'
                @update-team-data='updateHomeTeamData'>
            </ScorecardChart>
            <ScorecardChart
                v-if="gameData.awayTeam.nickname && activeTeam==='away'"
                :roster="gameData.awayTeam"
                :team="awayTeamData"
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
        this.player = '';
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
          players: [
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
          players: [
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
          players: [
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
          players: [
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
          players: [
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
                    border: "3px solid yellow"
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
    border-radius: 10px;
}
.scorecard {
    width: 98%;
    position: relative;
    background-color: #4d926d;
    padding: 10px 0 30px 0;
    border: 5px solid #1E392A;
    margin: -5px auto 20px auto;
    border-radius: 20px;
    color: black;
}

.team-select-buttons {
    width: 90%;
    display: flex;
    justify-content: space-evenly;
    margin: auto;
}

.team-button {
    width: 40%;
    padding: 10px 0 10px 0;
    border-radius: 30px;
}


</style>

<template>
    <div>
        <div class='app-header'>
            <h1>Stat Trax</h1>
            <Help v-if='help' :toggleHelp='toggleHelp'></Help>
        </div>

        <div class='scorecard'>
            <h2>Scorecard</h2>
            <button v-on:click='toggleHelp' id='help-button'>Help</button>
            <ScorecardHeader 
                :teams='teams' 
                @update-game-data='updateGameData'>
            </ScorecardHeader>
            <div class='team-select-buttons'>
                <button class='team-button' :style='checkTeamButtonStyle("home")' v-on:click='homeButton'>Home</button>
                <button class='team-button' :style='checkTeamButtonStyle("away")' v-on:click='awayButton'>Away</button>
            </div>
            <Boxscore 
                v-if='gameData.homeTeam.nickname && gameData.awayTeam.nickname'
                :homeTeamNickname='gameData.homeTeam.nickname'
                :homeTeamData='homeTeamData'
                :awayTeamNickname='gameData.awayTeam.nickname'
                :awayTeamData='awayTeamData'>
            </Boxscore>
            <ScorecardChart
                v-if="activeTeam==='home'"
                :roster="gameData.homeTeam"
                :team="homeTeamData"
                :inningsRendered='inningsRendered'
                :toggleUp='toggleInningRangeUp'
                :toggleDown='toggleInningRangeDown'
                @update-team-data='updateHomeTeamData'>
            </ScorecardChart>
            <ScorecardChart
                v-if="activeTeam==='away'"
                :roster="gameData.awayTeam"
                :team="awayTeamData"
                :inningsRendered='inningsRendered'
                :toggleUp='toggleInningRangeUp'
                :toggleDown='toggleInningRangeDown'
                @update-team-data='updateAwayTeamData'>
            </ScorecardChart>
        </div>
    </div>
</template>


<script>
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

import ScorecardHeader from './components/scorecard-header.vue';  
import Boxscore from './components/boxscore.vue';  
import ScorecardChart from './components/scorecard-chart.vue';
import Help from './components/help.vue';

export default {
    name: 'App',
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
            gameData: {
                homeTeam: {},
                awayTeam: {},
                date: '',
                time: '',
                weather: ''
            },
            activeTeam: 'away',
            inningRange: 0,
            help: false,
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
    },
    components: {
            Help,
            ScorecardHeader,
            Boxscore,
            ScorecardChart
        }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
body {
    width: 98%;
    margin: auto
}

h1, h2, .app-header {
    text-align: center;
}

h5 {
    padding: 5px;
    margin: 0;
}

p {
    margin: 0;
}

.scorecard {
    position: relative;
    background-color: darkgray;
    padding: 10px 0 30px 0;
    border: 5px solid black;
    margin: 10px auto 20px auto;
    border-radius: 20px;
}

#help-button {
    height: 50px;
    width: 50px;
    position: absolute;
    top: 15px;
    right: 15px;
    border-radius: 10px;
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

.score-board {
    text-align: center;
    border: 1px solid black;
}

table {
    width: 50%;
    margin: 10px auto 10px auto;
    background-color: white;
}

th, td {
    border: 1px solid black;
    padding: 5px;
}
</style>

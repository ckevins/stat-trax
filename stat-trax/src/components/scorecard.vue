<template>
<div class='scorecard'>
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

import ScorecardHeader from './scorecard-header.vue';  
import Boxscore from './boxscore.vue';  
import ScorecardChart from './scorecard-chart.vue';

export default {
    name: 'Scorecard',
    props: {
        teams: Array,
        toggleHelp: Function
    },
    data: function () {
        return {
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
        ScorecardHeader,
        Boxscore,
        ScorecardChart
    }
}
</script>

<style scoped>
.scorecard {
    position: relative;
    background-color: #4d926d;
    padding: 10px 0 30px 0;
    border: 5px solid #1E392A;
    margin: 10px auto 20px auto;
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
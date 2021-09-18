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
            <button class='team-button' v-on:click='homeButton'>Home</button>
            <button class='team-button' v-on:click='awayButton'>Away</button>
        </div>
        <Boxscore 
            v-if='homeTeam && awayTeam'
            :homeTeam='homeTeam'>
        </Boxscore>
        <ScorecardChart :team="homeTeamData"></ScorecardChart>
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
    get baseColors() {
        if (this.runner === 0) {
            return ['white', 'white', 'white', 'white']
        } else if (this.runner === 1){
            return ['red', 'white', 'white', 'white']
        } else if (this.runner === 2) {
            return ['red', 'red', 'white', 'white']
        } else if (this.runner === 3) {
            return ['red', 'red', 'red', 'white']
        } else if (this.runner === 4) {
            return ['red', 'red', 'red', 'red']
        } else {
        return ['white', 'white', 'white', 'white']
        }
    }
}
const getAtBats = (atbats, subBool) => {
    let abs = 0;
    atbats.forEach(element => {
        if (element.sub === subBool) {
            if (element.result !== null && 
                element.result !== '' &&
                element.result !== 'BB' && 
                element.result !== 'HBP' && 
                element.result !== 'SF' &&
                element.result !== 'SH') {
                    abs += 1;
                }
        }
    })
    return abs;
}
const getResults = (atbats, subBool) => {
    let hits = 0;
    let bbs = 0;
    let hbps = 0;
    let ks = 0;
    atbats.forEach(element => {
        if (element.sub === subBool) {
            if (element.result === '1B' ||
            element.result === '2B' || 
            element.result === '3B' || 
            element.result === 'HR') {
                hits += 1;
            } else if (element.result === 'BB') {
                bbs += 1;
            } else if (element.result === 'K' || element.result === 'Kc') {
                ks += 1;
            } else if (element.result === 'HBP') {
                hbps += 1;
            }
        }
    });
    return [hits, bbs, hbps, ks]
}
const getRuns = (atbats, subBool) => {
    let runs = 0;
    atbats.forEach(element => {
        if (element.sub === subBool) {
            if (element.runner === 4) {
                runs += 1
            }
        }
    });
    return runs
}
const getRbis = (atbats, subBool) => {
    let rbis = 0;
    atbats.forEach(element => {
        if (element.sub === subBool) {
            if (element.rbi !== '0') {
                rbis += element.rbi
            }
        }
    })
    return rbis;
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
    get starterTally () {
        let abs = getAtBats(this.atbats, false);
        let [hits, bbs, hbps, ks] = getResults(this.atbats, false);
        let runs = getRuns(this.atbats, false);
        let rbis = getRbis(this.atbats, false);
        return [abs, hits, runs, rbis, bbs, hbps, ks]
    }
    get subTally () {
        let abs = getAtBats(this.atbats, true);
        let [hits, bbs, hbps, ks] = getResults(this.atbats, true);
        let runs = getRuns(this.atbats, true);
        let rbis = getRbis(this.atbats, true);
        return [abs, hits, runs, rbis, bbs, hbps, ks]
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
                homeTeam: '',
                awayTeam:'',
                date: '',
                time: '',
                weather: ''
            },
            activeTeam: 'away',
            help: false
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
        homeButton: function () {
            this.activeTeam = 'home';
        },
        awayButton: function () {
            this.activeTeam = 'away';
        }
    },
    computed: {
        homeTeamData: function() {
            return {
                nickname: this.gameData.homeTeam.nickname,
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
        },
        awayTeamData: function() {
            return {
                nickname: this.gameData.awayTeam.nickname,
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

.scorecard-columns {
    display: flex;
    width: 75%;
    margin-left: 5%;
}


.player-selects-head {
    width: 15%;
    display: flex;
}

.inning-heads {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.scorecard-row {
    margin: auto;
    width: 95%;
    display: flex;
}

.player-selects{
    width: 15%;
    display: flex;
    justify-content: space-evenly;
}

.player-selects {
    background-color: white;
    border: 1px solid navy;
}

.player-selects-children {
    padding-top: 20%;
}

.batting-order {
    padding-top: 15%;
}

.diamond {
    position: relative;
    background-color: white;
    border: 1px solid navy;
    width: 200px;
    height: 150px;
    background-image: url('/Users/codyevins/Documents/Code/personal-projects/baseball-scorecard/stat-trax/src/assets/diamond.jpg');
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
    top: 30%;
    left: 30%;
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
    transform: rotate(45deg)
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
    width: 70px;
}

.tally-container {
    width: 10%;
    display: block;
}

.tally-parent {
    display: flex;
    height: 50%;
    margin: auto;
}

.tally-child {
    border: 1px solid navy;
    background-color: white;
    text-align: center;
    padding: 0 5%;
}
</style>

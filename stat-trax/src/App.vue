<template>

  <div class='app-header'>
    <div v-if='visibility.help' class='help'>
      <button v-on:click='toggleHelp' id='help-x'> X </button>
      <h2 style='color:white'>Help:</h2>
      <h3>Getting Started:</h3>
      <ul>
        <li>To begin, select the team that you are entering a scorecard for at the top of the page.</li>
        <li>Next, select how many players will be starting (or how many will be hitting in your batting order).</li>
        <li>Then, select this game's date, time, opponent, and weather conditions.</li>
      </ul>
      <h3>Line-ups:</h3>
      <ul>
        <li>Once you've selected your team, you can select your starters and subs as well as their positions in the far left column.</li>
        <li>If an at-bat in the inning column was taken by the sub, be sure to check the sub box in the bottom right corner of each at-bat box.</li>
      </ul>
      <h3>At-Bats:</h3>
      <ul>
        <li>Select the result of each at-bat using the result drop-down box.</li>
        <li>Some results such as groundouts, double plays, and flyouts will cause an additional box to appear where you can enter notes such as 6-4-3 or F7.</li>
        <li>Bases can be clicked to indicate the baserunner's progress.</li>
        <li>Some results such as 1B, 2B, 3B, HR, or BB will automatically fill in the corresponding bases.</li>
        <li>If a base is clicked by mistake, clicking another base will overwrite the previous selection.</li>
        <li>To erase the baserunner's progress completely, click the currently selected base again.</li>
        <li>RBIs, stolen bases, and outs can be tracked in each at-bats box as well.</li>
        <li>To indicate that a run is scored, all you need to do is make sure that home plate is your selected base (all bases colored in).</li>
        <li>As you fill in at-bats, each player's cumulative stats for the game will be automaticall tabulated in the far right column.</li>
      </ul>
      <h3>Innings:</h3>
      <ul>
        <li>Only 5 innings can be viewed at a time.</li>
        <li>To scroll across innings, press the arrow buttons.</li>
      </ul>
    </div>
    <h1>Stat Trax</h1>
  </div>

  <div class='scorecard' v-if='visibility.scorecardSeen'>
      
      <h2>Scorecard</h2>
      
      <button v-on:click='toggleHelp' id='help-button'>Help</button>
      

      <div class='scorecard-header'>

          <label>Home Team:</label>
          <select name='home-team' id='home-team-select' v-model='homeTeam'>
              <option value=''>--Team--</option>
              <option v-for='team in teams' :value='team' :key='team.nickname'> {{ team.nickname }} </option>
          </select>

          <label>Away Team:</label>
          <select name='away-team' id='away-team-select' v-model='awayTeam'>
              <option value=''>--Team--</option>
              <option v-for='team in teams' :value='team' :key='team.nickname'>{{ team.nickname }}</option>
          </select>

          <label>Date:</label>
          <input type="date" v-on:change='updateDate'>

          <label>Game Time:</label>
          <select name='gametime' id='gametime-select' v-on:change='updateTime'>
            <option value=''>--Select--</option>
            <option v-for='gametime in scorecardEntry.gametimes' :value='gametime' :key='gametime'>{{ gametime }}</option>
          </select>
          
          <label>Weather:</label>
          <select name='weather' id='weather-select'>
            <option value=''>--Select--</option>
            <option v-for='weather in scorecardEntry.weathers' :value='weather' :key='weather'>{{ weather }}</option>
          </select>
      </div>


      <div class='team-select-buttons'>
          <button class='team-button' v-on:click='homeButton'>Home</button>
          <button class='team-button' v-on:click='awayButton'>Away</button>
      </div>


      <div>
        <table class='score-board' v-if='homeTeam && awayTeam'>
          <tr>
            <th>Box Score</th>
            <th v-for='index in 10' :key='index'>{{ index }}</th>
            <th>R</th>
            <th>H</th>
          </tr>
          <tr>
            <th> {{ awayTeam.nickname }} </th>
            <td v-for='score in awayTeamBoxscore.inningScore' :key='score'> {{score}} </td>
            <td> {{ awayTeamBoxscore.score }} </td>
            <td> {{ awayTeamBoxscore.hits }} </td>
          </tr>
          <tr>
            <th> {{ homeTeam.nickname }} </th>
            <td v-for='score in homeTeamBoxscore.inningScore' :key='score'> {{score}} </td>
            <td> {{ homeTeamBoxscore.score }} </td>
            <td> {{ homeTeamBoxscore.hits }}</td>
          </tr>
        </table>
      </div>

      <ScorecardChart></ScorecardChart>
        
  </div>
</template>


<script>
  import ScorecardChart from './components/scorecard-chart.vue';
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
        activeTeam: 'away',
        homeTeam: '',
        awayTeam: '',
        date: '',
        time: '',
        weather: '',
        visibility: {
            help: false,
            scorecardSeen: true,
            inningRange: 0
        },
        scorecardEntry: {
            weathers: [
                'Sunny', 
                'Overcast', 
                'Rain'],
            gametimes: [
                '1:00pm', 
                '4:00pm', 
                '7:00pm'],
            positions: [
                'P', 
                'C', 
                '1B', 
                '2B', 
                '3B', 
                'SS', 
                'RF', 
                'CF', 
                'LF', 
                'DH'
            ],
            tallies: 
                ['AB', 
                'H',
                'R',
                'RBI',
                'BB',
                'HBP',
                'K'
                ],
            results: [
                '1B',
                '2B',
                '3B',
                'HR',
                'BB',
                'K',
                'Kc',
                'HBP',
                'G',
                'U',
                'F',
                'L',
                'FF',
                'FO',
                'DP',
                'FC',
                'SF',
                'SH']
        }
      }
    },
    methods: {
      toggleHelp: function () {
          if (this.visibility.help === false) {
              this.visibility.help = true;
          } else {
              this.visibility.help = false;
          }
      },
      homeButton: function () {
          this.activeTeam = 'home';
      },
      awayButton: function () {
          this.activeTeam = 'away';
      },
      updateDate: function (event) {
          this.date = event.target.value.replace(/-/gi,'')
      },
      updateTime: function (event) {
          this.time = event.target.value.replace(':', '').replace('pm', '');
      }
    },
    computed: {
      gameId: function () {
          let awayTeamString = this.awayTeam.nickname.toLowerCase().replace(' ', '');
          let homeTeamString = this.homeTeam.nickname.toLowerCase().replace(' ','');
          return awayTeamString + '@' + homeTeamString + this.date + this.time;
      },
      homeTeamBoxscore: function () {
          let inningScore = new Array(10).fill(0);
          let score = 0;
          let hits = 0
          this.homeTeamData.player.forEach(player => {
              score += (player.starterTally[2] + player.subTally[2]);
              hits += (player.starterTally[1] + player.subTally[1]);
              player.atbats.forEach((atbat, index) => {
                  if (atbat.runner === 4) {
                      inningScore[index] += 1;
                  }
              })
          });
          return {
              score,
              hits,
              inningScore
          };
      },
      awayTeamBoxscore: function () {
          let inningScore = new Array(10).fill(0);
          let score = 0;
          let hits = 0;
          this.awayTeamData.player.forEach(player => {
              score += (player.starterTally[2] + player.subTally[2]);
              hits += (player.starterTally[1] + player.subTally[1]);
              player.atbats.forEach((atbat, index) => {
                  if (atbat.runner === 4) {
                      console.log('box score if ran!')
                      inningScore[index] += 1;
                  }
              })
          });
          return {
              score,
              hits,
              inningScore
          }
      }
    },
    components: {
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

.help {
    color: white;
    text-align: left;
    position: fixed;
    height: 75%; 
    width: 50%;
    background-color: rgba(0, 0, 0, 0.904);
    border: 5px solid white;
    padding: 0 10px 0 10px;
    margin-left:  25% ;
    margin-top: 5%;
    z-index: 100;
}

#help-x {
    position: absolute;
    height: 30px;
    width: 30px;
    top: 5px;
    right: 5px;
}


.scorecard-header{
    display: flex;
    justify-content: space-between;
    padding: 40px;
    width: 90%;
    margin: 5px auto 20px auto;
    border: 2px solid white;
    background-color: rgb(47, 47, 47);
    color: white;
    border-radius: 15px;
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

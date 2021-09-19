<template>
    <div>
        <div class='app-header'>
            <h1>Stat Trax</h1>
            <Help v-if='help' :toggleHelp='toggleHelp'></Help>
        </div>

        <Scorecard :teams='teams'></Scorecard>
        
    </div>
</template>


<script>

import Help from './components/help.vue';
import Scorecard from './components/scorecard.vue';

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
        }
    },
    components: {
            Help,
            Scorecard
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

h1 {
    color: rgb(77, 77, 77)
}

h2, .app-header {
    text-align: center;
    color: white
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
    background-color: #4d926d;
    padding: 10px 0 30px 0;
    border: 5px solid #1E392A;
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

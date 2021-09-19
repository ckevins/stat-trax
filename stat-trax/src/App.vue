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
  color: white;
  margin-top: 60px;
}
body {
    width: 98%;
    margin: auto;
    background-color: #472800;
}

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
</style>

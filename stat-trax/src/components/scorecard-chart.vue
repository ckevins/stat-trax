<template>
    <div class='chart' id='home-team-chart' v-if="activeTeam === 'home'">

    <h2>{{ homeTeam.nickname }}</h2>

    <div class='scorecard-columns'>

        <div class='player-selects-head'>
            <h2>Player</h2>
            <h2>Pos</h2>
        </div>

        <div class='inning-heads'>
            <button v-on:click='toggleInningRangeDown'> --- </button>
            <h2 v-for='inning in inningsRendered' id='inning-columns' :key='inning'> {{ inning }} </h2>
            <button v-on:click='toggleInningRangeUp'> --- </button>
        </div>

    </div>

    <div class='scorecard-row' v-for='row_index in 10' :key='row_index'>
        <div class='player-selects'>

        <div class='batting-order'>
            <h5>{{row_index}}.</h5>
        </div>

        <div class='player-selects-children'>
            <div class='starter'>
            <select name='player' v-model='homeTeamData.player[row_index-1].player'>
                <option value=''>--Player--</option>
                <option v-for='player in homeTeam.players' :value='player' :key='player'>{{ player }}</option>
            </select>
            <select name='position' v-model='homeTeamData.player[row_index-1].position'>
                <option value=''>-Pos-</option>
                <option v-for='position in scorecardEntry.positions' :value='position' :key='position'>{{ position }}</option>
            </select>
            </div>
            <div class='sub'>
            <select name='sub' v-model='homeTeamData.player[row_index-1].sub'>
                <option value=''>--Sub--</option>
                <option v-for='player in homeTeam.players' :value='player' :key='player'>{{ player }}</option>
            </select>
            </div>
        </div>
        </div>
        
        <div class='diamond' v-for='inning_index in inningsRendered' :key='inning_index'> 

        <div class='rbi'>
            <select name='RBI' id='RBI-select' v-model='homeTeamData.player[row_index-1].atbats[inning_index-1].rbi'>
                <option :value='0'>-</option>
                <option v-for='index in 4' :value='index' :key='index'>{{ index }}</option>
            </select>
            <label>RBI</label>
        </div>

        <div class='sb'>
            <select name='SB' id='SB-select' v-model='homeTeamData.player[row_index-1].atbats[inning_index-1].sb'>
                <option value='0'>-</option>
                <option v-for='index in 3' :value='index' :key='index'>{{ index }}</option>
            </select>
            <label>SB</label>
        </div>

        <div class='result'>
            <select name='result' id='result-select' v-model='homeTeamData.player[row_index-1].atbats[inning_index-1].result' v-on:change='resultUpdateRunnerNote($event, row_index, inning_index, "home")'>
            <option value=''>-Result-</option>
            <option v-for='result in scorecardEntry.results' :value='result' :key='result'>{{ result }}</option>
            </select><br>
            <input v-if='homeTeamData.player[row_index-1].atbats[inning_index-1].noteVisibility' placeholder="Note" id='note-input' v-on:change='updateNote($event, row_index, inning_index, "home")'>
        </div>

        <div class='out-count'>
            <select name='out-count' id='out-count-select' v-model='homeTeamData.player[row_index-1].atbats[inning_index-1].out'>
                <option value='0'>-</option>
                <option v-for='index in 3' :value='index' :key='index'>{{ index }}</option>
            </select>
            <label>Out</label>
        </div>

        <button 
            class='base-button' 
            id='first-base' 
            :style='checkButtonStyle(0, row_index, inning_index, "home")'
            v-on:click='updateRunner(1, row_index, inning_index, "home")'>
        </button>
        <button 
            class='base-button' 
            id='second-base'
            :style='checkButtonStyle(1, row_index, inning_index, "home")'
            v-on:click='updateRunner(2, row_index, inning_index, "home")'>
        </button>
        <button 
            class='base-button' 
            id='third-base'
            :style='checkButtonStyle(2, row_index, inning_index, "home")'
            v-on:click='updateRunner(3, row_index, inning_index, "home")'>
        </button>
        <button 
            class='home-plate-button' 
            id='home-plate'
            :style='checkButtonStyle(3, row_index, inning_index, "home")'
            v-on:click='updateRunner(4, row_index, inning_index, "home")'>
        </button>
        <div class='sub-box'>
            <label for='sub-box'>Sub:</label>
            <input type="checkbox" id="sub-box"
            v-on:click='toggleSub(row_index, inning_index, "home")'
            v-model='homeTeamData.player[row_index-1].atbats[inning_index-1].sub'>
        </div>
        </div>

        <div class= 'tally-container'>
        <div class='tally-parent'>
            <div v-for='(tally,index) in scorecardEntry.tallies' class='tally-child' id='starter-tally' :key='tally'>
            <h5>{{ tally }}</h5>
            <p>{{ homeTeamData.player[row_index-1].starterTally[index] }}</p>
            </div>
        </div>
        <div class='tally-parent' v-if='homeTeamData.player[row_index-1].sub'>
            <div v-for='(tally,index) in scorecardEntry.tallies' class='tally-child' id='sub-tally' :key='tally'>
            <h5>{{ tally }}</h5>
            <p>{{ homeTeamData.player[row_index-1].subTally[index] }}</p>
            </div>
        </div>
        
        </div>

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


export default {
  name: 'ScorecardChart',
  date: function () {
      return {
        homeTeamData: {
            player: [
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
            player: [
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
  }
}
</script>
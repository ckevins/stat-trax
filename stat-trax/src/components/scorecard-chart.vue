<template>
<div class='chart'>
    <h2>{{ roster.nickname }}</h2>

    <div class='scorecard-columns'>
        <div class='player-selects-head'>
            <h2>Lineup</h2>
        </div>
        <div class='inning-heads'>
            <button v-on:click='toggleDown'> &lt;&lt;&lt; </button>
            <h2 v-for='inning in inningsRendered' id='inning-columns' :key='inning'> {{ inning }} </h2>
            <button v-on:click='toggleUp'> &gt;&gt;&gt; </button>
        </div>
    </div>

    <div class='scorecard-row' v-for='row_index in 10' :key='row_index'>
        <div class='player-selects'>
            <div class='batting-order'>
                <h5>{{row_index}}.</h5>
            </div>
            <div class='player-selects-children'>
                <div class='starter'>
                <select name='player' v-model='teamData.players[row_index-1].player' v-on:change='updateData'>
                    <option value=''>--Player--</option>
                    <option v-for='player in roster.players' :value='player' :key='player'>{{ player }}</option>
                </select>
                <select name='position' v-model='teamData.players[row_index-1].position' v-on:change='updateData'>
                    <option value=''>-Pos-</option>
                    <option v-for='position in positions' :value='position' :key='position'>{{ position }}</option>
                </select>
                </div>
                <div class='sub'>
                <select name='sub' v-model='teamData.players[row_index-1].sub' v-on:change='updateData'>
                    <option value=''>--Sub--</option>
                    <option v-for='player in roster.players' :value='player' :key='player'>{{ player }}</option>
                </select>
                </div>
            </div>
        </div>
        <div class='diamond' v-for='inning_index in inningsRendered' :key='inning_index'> 
            <div class='rbi'>
                <select name='RBI' id='RBI-select' v-model='teamData.players[row_index-1].atbats[inning_index-1].rbi' v-on:change='updateData'>
                    <option :value='0'>-</option>
                    <option v-for='index in 4' :value='index' :key='index'>{{ index }}</option>
                </select>
                <label>RBI</label>
            </div>
            <div class='sb'>
                <select name='SB' id='SB-select' v-model='teamData.players[row_index-1].atbats[inning_index-1].sb' v-on:change='updateData'>
                    <option value='0'>-</option>
                    <option v-for='index in 3' :value='index' :key='index'>{{ index }}</option>
                </select>
                <label>SB</label>
            </div>
            <div class='result'>
                <select name='result' id='result-select' v-model='teamData.players[row_index-1].atbats[inning_index-1].result' v-on:change='resultUpdateRunner($event, row_index, inning_index); updateData'>
                <option value=''>-Result-</option>
                <option v-for='result in results' :value='result' :key='result'>{{ result }}</option>
                </select>
            </div>
            <div class='out-count'>
                <select name='out-count' id='out-count-select' v-model='teamData.players[row_index-1].atbats[inning_index-1].out' v-on:change='updateData'>
                    <option value='0'>-</option>
                    <option v-for='index in 3' :value='index' :key='index'>{{ index }}</option>
                </select>
                <label>Out</label>
            </div>
            <button 
                class='base-button' 
                id='first-base'
                :style='checkButtonStyle(1, row_index, inning_index)'
                v-on:click='updateRunner(1, row_index, inning_index); updateData'>
            </button>
            <button 
                class='base-button' 
                id='second-base'
                :style='checkButtonStyle(2, row_index, inning_index)'
                v-on:click='updateRunner(2, row_index, inning_index); updateData'>
            </button>
            <button 
                class='base-button' 
                id='third-base'
                :style='checkButtonStyle(3, row_index, inning_index)'
                v-on:click='updateRunner(3, row_index, inning_index); updateData'>
            </button>
            <button 
                class='home-plate-button' 
                id='home-plate'
                :style='checkButtonStyle(4, row_index, inning_index)'
                v-on:click='updateRunner(4, row_index, inning_index); updateData'>
            </button>
            <div class='sub-box'>
                <label for='sub-box'>Sub:</label>
                <input type="checkbox" id="sub-box" v-model='teamData.players[row_index-1].atbats[inning_index-1].sub' v-on:change='updateData'>
            </div>
        </div>
        <div class= 'tally-container'>
            <div class='tally-parent'>
                <div v-for='(tally,index) in tallies' class='tally-child' id='starter-tally' :key='tally'>
                <h5>{{ tally }}</h5>
                <p>{{ getTallies(team.players[row_index-1].atbats, false)[index] }}</p>
                </div>
            </div>
            <div class='tally-parent' v-if='team.players[row_index-1].sub'>
                <div v-for='(tally,index) in tallies' class='tally-child' id='sub-tally' :key='tally'>
                <h5>{{ tally }}</h5>
                <p>{{ getTallies(team.players[row_index-1].atbats, true)[index] }}</p>
                </div>
            </div>
            
        </div>
    </div>
</div>
</template>






<script>
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
export default {
    name: 'ScorecardChart',
    props: {
        roster: Object,
        team: Object, 
        inningsRendered: Array,
        toggleUp: Function,
        toggleDown: Function
    },
    data: function () {
        return {
            positions: ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'],
            tallies: ['AB', 'H', 'R', 'RBI', 'BB', 'HBP', 'K'],
            results: ['1B', '2B', '3B', 'HR', 'BB', 'K', 'Kc', 'HBP', 'G', 'U', 'F', 'L', 'FF', 'FO', 'DP', 'FC', 'SF', 'SH'],
            teamData: this.team
        }
    },
    methods: {
        updateData: function () {
            this.$emit('update-teams-data', this.teamData);
        },
        getTallies: function (atbatsArr, subBool) {
            let abs = getAtBats(atbatsArr, subBool);
            let [hits, bbs, hbps, ks] = getResults(atbatsArr, subBool);
            let runs = getRuns(atbatsArr, subBool);
            let rbis = getRbis(atbatsArr, subBool);
            return [abs, hits, runs, rbis, bbs, hbps, ks]
        },
        updateRunner: function (base, row_index, inning_index) {
            if (this.teamData.players[row_index-1].atbats[inning_index-1].runner === base) {
                this.teamData.players[row_index-1].atbats[inning_index-1].runner = 0
            } else {
                this.teamData.players[row_index-1].atbats[inning_index-1].runner = base
            }
        },
        resultUpdateRunner: function (event, row, inning) {
            let result = event.target.value;
            let atbat = this.teamData.players[row-1].atbats[inning-1];
            if(result === '1B' ||
                result === 'BB' ||
                result === 'HBP') {
                    atbat.runner = 1;
                    atbat.noteVisibility = false
            } else if (result === '2B') {
                atbat.runner = 2;
                atbat.noteVisibility = false
            } else if (result === '3B') {
                atbat.runner = 3;
                atbat.noteVisibility = false
            } else if (result === 'HR') {
                atbat.runner = 4;
                atbat.noteVisibility = false
            } else if (result === 'K' ||
            result === 'Kc' ||
            result === '') {
                atbat.runner = 0;
                atbat.noteVisibility = false
            } else {
                atbat.runner = 0;
                atbat.noteVisibility = true
            }
        },
        checkButtonStyle: function (baseNum, row_index, inning_index) {
            if (this.teamData.players[row_index-1].atbats[inning_index-1].runner >= baseNum) {
                return {
                    backgroundColor: "red"
                }
            } else {
                return {
                    backgroundColor: "white"
                }
            }
        }
    },

}
</script>

<style scoped>
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
    background-image: url('~@/assets/diamond.jpg');
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
<template>
<div class='chart'>
    <h2>{{ team.nickname }}</h2>

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
                <select name='player' v-on:change='updateData($event.target.value)'>
                    <option value=''>--Player--</option>
                    <option v-for='playerObj in team.players' :value='playerObj.player' :key='playerObj.player'>{{ playerObj.player }}</option>
                </select>
                <select name='position' v-on:change='updateData($event.target.value)'>
                    <option value=''>-Pos-</option>
                    <option v-for='position in positions' :value='position' :key='position'>{{ position }}</option>
                </select>
                </div>
                <div class='sub'>
                <select name='sub' v-on:change='updateData($event.target.value)'>
                    <option value=''>--Sub--</option>
                    <option v-for='playerObj in team.players' :value='playerObj.player' :key='playerObj.player'>{{ playerObj.player }}</option>
                </select>
                </div>
            </div>
        </div>
        <div class='diamond' v-for='inning_index in inningsRendered' :key='inning_index'> 
            <div class='rbi'>
                <select name='RBI' id='RBI-select' v-on:change='updateData($event.target.value)'>
                    <option :value='0'>-</option>
                    <option v-for='index in 4' :value='index' :key='index'>{{ index }}</option>
                </select>
                <label>RBI</label>
            </div>
            <div class='sb'>
                <select name='SB' id='SB-select' v-on:change='updateData($event.target.value)'>
                    <option value='0'>-</option>
                    <option v-for='index in 3' :value='index' :key='index'>{{ index }}</option>
                </select>
                <label>SB</label>
            </div>
            <div class='result'>
                <select name='result' id='result-select' v-on:change='updateData($event.target.value)'>
                <option value=''>-Result-</option>
                <option v-for='result in results' :value='result' :key='result'>{{ result }}</option>
                </select><br>
                <input v-if='team.players[row_index-1].atbats[inning_index-1].noteVisibility' placeholder="Note" id='note-input' v-on:change='updateNote($event, row_index, inning_index, "home")'>
            </div>
            <div class='out-count'>
                <select name='out-count' id='out-count-select' v-on:change='updateData($event.target.value)'>
                    <option value='0'>-</option>
                    <option v-for='index in 3' :value='index' :key='index'>{{ index }}</option>
                </select>
                <label>Out</label>
            </div>
            <button 
                class='base-button' 
                id='first-base' 
                :style='checkButtonStyle(0, row_index, inning_index)'
                v-on:click='updateRunner(1, row_index, inning_index)'>
            </button>
            <button 
                class='base-button' 
                id='second-base'
                :style='checkButtonStyle(1, row_index, inning_index)'
                v-on:click='updateRunner(2, row_index, inning_index)'>
            </button>
            <button 
                class='base-button' 
                id='third-base'
                :style='checkButtonStyle(2, row_index, inning_index)'
                v-on:click='updateRunner(3, row_index, inning_index)'>
            </button>
            <button 
                class='home-plate-button' 
                id='home-plate'
                :style='checkButtonStyle(3, row_index, inning_index)'
                v-on:click='updateRunner(4, row_index, inning_index)'>
            </button>
            <div class='sub-box'>
                <label for='sub-box'>Sub:</label>
                <input type="checkbox" id="sub-box">
            </div>
        </div>
        <div class= 'tally-container'>
            <div class='tally-parent'>
                <div v-for='(tally,index) in tallies' class='tally-child' id='starter-tally' :key='tally'>
                <h5>{{ tally }}</h5>
                <p>{{ team.players[row_index-1].starterTally[index] }}</p>
                </div>
            </div>
            <div class='tally-parent' v-if='team.players[row_index-1].sub'>
                <div v-for='(tally,index) in scorecardEntry.tallies' class='tally-child' id='sub-tally' :key='tally'>
                <h5>{{ tally }}</h5>
                <p>{{ team.player[row_index-1].subTally[index] }}</p>
                </div>
            </div>
            
        </div>
    </div>
</div>
</template>






<script>
export default {
    name: 'ScorecardChart',
    props: {
        team: Object
    },
    data: function () {
        return {
            inningRange: 0,
            positions: ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH'],
            tallies: ['AB', 'H', 'R', 'RBI', 'BB', 'HBP', 'K'],
            results: ['1B', '2B', '3B', 'HR', 'BB', 'K', 'Kc', 'HBP', 'G', 'U', 'F', 'L', 'FF', 'FO', 'DP', 'FC', 'SF', 'SH']
        }
    },
    methods: {
        toggleInningRangeDown: function () {
            if(this.inningRange !== 0) {
                this.inningRange -= 1;
            }
        },
        toggleInningRangeUp: function () {
            if(this.inningRange !== 5) {
                this.nningRange += 1;
            }
        },
        updateData: function (datum) {
            this.$emit('change', datum);
        },
        checkButtonStyle: function (base, row, inning) {
            let color= this.team.players[row-1].atbats[inning-1].baseColors[base];
            return {
                backgroundColor: color
            }
        },
    },
    computed: {
        inningsRendered: function () {
            let range = this.inningRange;
            return [range + 1, range + 2, range + 3, range + 4, range +5]
        }
    }
}
</script>
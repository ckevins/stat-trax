<template>
    <div class="add-league upper-tab">
        <h2>Create League</h2>
        <div class='form'>  
            <div class='form-head'>
                <h3>League Name:</h3><br>
                <input id='team-name-input' type="text" v-model='leagueName'/><br>
                <div class="league-size">
                    <h3>Number of Divisions: {{league.length}}</h3><br>
                    <button class='league-size-button' v-on:click='leagueSizeDown()'>-</button>
                    <button class='league-size-button' v-on:click='leagueSizeUp()'>+</button>
                </div>
            </div>
            <div class='division' v-for='division_index in league.length' :key='division_index'>
                <div class='division-head'>
                    <label>Division Name:</label><br>
                    <input id='division-name' type="text" v-model='league[division_index-1].divisionName'/><br>
                    <div class='division-size'>
                        <h4>Number of teams: {{league[division_index-1].teams.length}}</h4><br>
                        <button class='division-size-button' v-on:click='divisionSizeDown(division_index)'>-</button>
                        <button class='division-size-button' v-on:click='divisionSizeUp(division_index)'>+</button>
                    </div>
                </div>
                <div class='teams-parent'>
                    <div class='team-details' v-for='team_index in league[division_index-1].teams.length' :key='team_index'>
                        <h3>Team {{team_index}}</h3>
                        <table class='team-header'>
                            <tr>
                                <th>Team Name:</th>
                                <td><input type="text" id='team-name' v-model="league[division_index-1].teams[team_index-1].nickname"/></td>
                            </tr>
                            <tr>
                                <th>Primary Color:</th>
                                <td><input type="color" id ='team-color' v-model="league[division_index-1].teams[team_index-1].primaryColor"/></td>
                            </tr>
                            <tr>
                                <th>Manager:</th>
                                <td><input type="text" id='manager' v-model="league[division_index-1].teams[team_index-1].manager" placeholder="Last Name, First Name"/></td>
                            </tr>
                        </table>
                        <div class='roster-head'>
                            <h4>Roster</h4>
                            <button class='roster-button' v-on:click='rosterSizeDown(division_index, team_index)'>-</button>
                            <button class='roster-button' v-on:click='rosterSizeUp(division_index, team_index)'>+</button>
                        </div>
                        <div class='roster'  v-for='index in league[division_index-1].teams[team_index-1].roster.length' :key="index">
                            <label>{{index}}.</label>
                            <input type="text" id="player-name" placeholder="Last Name, First Name" v-model='league[division_index-1].teams[team_index-1].roster[index-1]'/>
                            <br>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
class TeamData {
    constructor () {
        this.nickname = '';
        this.primaryColor = '#ffffff';
        this.manager = '';
        this.roster = new Array(10).fill('')
    }
}

class DivisionData {
    constructor () {
        this.divisionName = '';
        this.teams = Array.from({length:4}, ()=> new TeamData)
    }
}

export default ({
    data: function () {
        return {
            leagueName: '',
            league: [
                new DivisionData
            ]
        }
    },
    methods: {
        leagueSizeUp: function () {
            this.league.push(new DivisionData)
        },
        leagueSizeDown: function () {
            if (this.league.length !== 1) {
                this.league.pop()
            }
        },
        divisionSizeUp: function (divisionIndex) {
            this.league[divisionIndex-1].teams.push(new TeamData)
        },
        divisionSizeDown: function (divisionIndex) {
            this.league[divisionIndex-1].teams.pop()
        },
        rosterSizeUp: function (divisionIndex, teamIndex) {
            this.league[divisionIndex-1].teams[teamIndex-1].roster.push('')
        },
        rosterSizeDown: function (divisionIndex, teamIndex) {
            this.league[divisionIndex-1].teams[teamIndex-1].roster.pop()
        }
    }
})
</script>


<style scoped>
h2 {
    color: white;
    text-align: center;
}

.form {
    width: 90%;
    margin: auto;
}

.form-head {
    width: 50%;
    margin: auto;
    text-align: center;
    padding-bottom: 20px;
}

#team-name-input {
    width: 100%;
    height: 40px;
    font-size: 2em;
    text-align: center;
    margin: 15px;
}

#number-of-divisions {
    max-width: 50px;
    font-size: 2em
}

.division {
    border: 5px solid #E9C893;
    background-color: #4d926d;
    padding: 10px;
    margin: 40px;
}

.division-head {
    width: 50%;
    margin: auto;
    text-align: center;
}

#division-name {
    width: 80%;
    height: 20px;
    font-size:1.4em;
    text-align: center;
    margin: 10px
}

.division-size, .league-size {
    width: 40%;
    margin: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.teams-parent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.team-details {
    margin: 10px;
    width: 20%;
    padding: 0 10px 10px;
    background-color: #1E392A;
    border: 2px solid white;
}

.team-header {
    width: 98%;
    margin: auto;
    text-align: right;
}

th {
    width: 45%;
}

.roster-head {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 4px
}

#team-name, #manager, #team-color {
    width: 100%;
}

.roster {
    display: block;
    text-align: right;
}

button {
    width: 30px;
    height: 30px;
}

.roster-button {
    width: 70px;
}

#player-name {
    margin: 2px;
    width: 85%;
}
    

</style>
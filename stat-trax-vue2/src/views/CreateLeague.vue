<template>
    <div class="add-league upper-tab">
        <div class='form'>  
            <div class='form-head'>
                <h1>League:</h1><br>
                <input id='team-name-input' type="text" placeholder="League Name" v-model='leagueName'/><br>
                <div class="league-size">
                    <h3>Divisions: {{league.length}}</h3><br>
                    <button class='league-size-button' v-on:click='leagueSizeDown()'>-</button>
                    <button class='league-size-button' v-on:click='leagueSizeUp()'>+</button>
                </div>
            </div>
            <div class='division' v-for='division_index in league.length' :key='division_index'>
                <div class='division-head'>
                    <h2>Division:</h2>
                    <input id='division-name' type="text" placeholder="Division Name" v-model='league[division_index-1].divisionName'/><br>
                    <div class='division-size'>
                        <h3>Number of teams: {{league[division_index-1].teams.length}}</h3>
                        <button class='division-size-button' v-on:click='divisionSizeDown(division_index)'>-</button>
                        <button class='division-size-button' v-on:click='divisionSizeUp(division_index)'>+</button>
                    </div>
                </div>
                <div class='teams-parent'>
                    <div class='team-details' v-for='team_index in league[division_index-1].teams.length' :key='team_index'>
                        <h3>Team {{team_index}}</h3>
                        <div class='team-basics'>
                            <h3>Team Name</h3>
                            <h3>Color</h3>
                            <h3>Manager</h3>
                            <input type="text" id='team-name' v-model="league[division_index-1].teams[team_index-1].nickname"/>
                            <input type="color" id ='team-color' v-model="league[division_index-1].teams[team_index-1].primaryColor"/>
                            <input type="text" id='manager' v-model="league[division_index-1].teams[team_index-1].manager" placeholder="Last Name, First Name"/>
                        </div>
                        <div class='roster-head'>
                            <h3>Roster ({{league[division_index-1].teams[team_index-1].roster.length}})</h3>
                            <button class='roster-button' v-on:click='rosterSizeDown(division_index, team_index)'>-</button>
                            <button class='roster-button' v-on:click='rosterSizeUp(division_index, team_index)'>+</button>
                        </div>
                        <div class='roster'>
                            <h5>Player Name</h5>
                            <h5>#</h5>
                            <h5>Pos</h5>
                            <h5>Sec.</h5>
                            <h5>Bats</h5>
                            <h5>Throws</h5>
                        </div>
                        <div class='roster' id="player"  v-for='index in league[division_index-1].teams[team_index-1].roster.length' :key="index">
                            <div class= 'name'>
                                <label>{{index}}.</label>
                                <input type="text" id="player-name" placeholder="Last Name, First Name" v-model='league[division_index-1].teams[team_index-1].roster[index-1].name'/>
                            </div>
                            <input type="number" id="jersey-number" placeholder="#" max=99 min=00 v-model='league[division_index-1].teams[team_index-1].roster[index-1].number'/>
                            <select id="position" v-model='league[division_index-1].teams[team_index-1].roster[index-1].primaryPos'>
                                <option value=''>--</option>
                                <option v-for='position in positions' :value="position" :key="position">{{position}}</option>
                            </select>
                            <select id="sec-position" v-model='league[division_index-1].teams[team_index-1].roster[index-1].secondaryPos'>
                                <option value=''>--</option>
                                <option v-for='position in positions' :value="position" :key="position">{{position}}</option>
                            </select>
                            <select id="bats" v-model='league[division_index-1].teams[team_index-1].roster[index-1].bats'>
                                <option value=''>--</option>
                                <option v-for='hand in handedness' :value="hand" :key="hand">{{hand}}</option>
                            </select>
                            <select id="throws" v-model='league[division_index-1].teams[team_index-1].roster[index-1].throws'>
                                <option value=''>--</option>
                                <option v-for='hand in handedness.slice(0,2)' :value="hand" :key="hand">{{hand}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <button @click='submitLeague(leagueName, league)'>Submit</button>
        </div>
    </div>
</template>

<script>
import db from '../firebaseInit';

class PlayerData {
    constructor () {
        this.name = null;
        this.number= null;
        this.primaryPos = null;
        this.secondaryPos = null;
        this.bats = null;
        this.throws = null;
    }
}

class TeamData {
    constructor () {
        this.nickname = null;
        this.primaryColor = '#ffffff';
        this.manager = null;
        this.roster = Array.from({length:10}, ()=> new PlayerData).map((obj)=>{return Object.assign({},obj)});
    }
}

class DivisionData {
    constructor () {
        this.divisionName = null;
        this.teams = Array.from({length:4}, ()=> new TeamData).map((obj)=>{return Object.assign({},obj)})
    }
}

export default ({
    data: function () {
        return {
            leagueName: '',
            league: [
                new DivisionData
            ],
            positions: ['P', 'C', '1B', '2B', '3B', 'SS', 'LF', 'CF', 'RF', 'DH', 'IF', 'OF', 'IF/OF', '1B/3B', '2B/SS', 'LF/RF'],
            handedness: ['R', 'L', 'S']
        }
    },
    methods: {
        leagueSizeUp: function () {
            this.league.push(new DivisionData)
        },
        leagueSizeDown: function () {
            if (this.league.length > 1) {
                this.league.pop()
            }
        },
        divisionSizeUp: function (divisionIndex) {
            this.league[divisionIndex-1].teams.push(new TeamData)
        },
        divisionSizeDown: function (divisionIndex) {
            if (this.league[divisionIndex-1].teams.length > 1) {
                this.league[divisionIndex-1].teams.pop()
            }
        },
        rosterSizeUp: function (divisionIndex, teamIndex) {
            this.league[divisionIndex-1].teams[teamIndex-1].roster.push(new PlayerData)
        },
        rosterSizeDown: function (divisionIndex, teamIndex) {
            this.league[divisionIndex-1].teams[teamIndex-1].roster.pop()
        },
        submitLeague: function (name, league) {
            db.collection("leagues")
                .add({
                    leagueName: name,
                    divisions: league.map((obj)=> {return Object.assign({}, obj)})
                })
                .then(()=> {
                    console.log("Document successfully written!")
                })
                .catch((error) => {
                    console.log("Error writing document: ", error)
                });
        }
    }
})
</script>


<style scoped>
h1 {
    margin-top: 20px;
}

h2 {
    color: white;
    text-align: center;
}

h3 {
    margin: 5px;
}

h5 {
    margin: 2px;
}

.form {
    width: 98%;
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
    margin: 20px;
}

.division-head {
    width: 50%;
    margin: auto;
    text-align: center;
    align-content: space-around;
}

#division-name {
    width: 80%;
    margin:10px;
    height: 20px;
    font-size:1.4em;
    text-align: center;
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
    justify-content: space-evenly;
}

.team-details {
    width: 45%;
    margin: 10px 0;
    padding: 0 10px 10px;
    background-color: #1E392A;
    border: 2px solid white;
}

.team-basics {
    display: grid;
    text-align: center;
    width: 95%;
    margin: auto;
    grid-template-columns: 40% 20% 40%;
    column-gap: 10px;
    justify-content: center;
}

#team-name, #team-color, #manager{
    justify-self: center;
    width: 80%;
}

.roster-head {
    text-align: center;
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.roster-button {
    width: 70px;
    margin: 5px;
}

button {
    width: 30px;
    height: 30px;
}

.roster {
    display: grid;
    grid-template-columns: 45% 1fr 10% 10% 1fr 1fr;
    column-gap: 10px;
    justify-content: center;
    text-align: center;
}

#player {
    padding: 2px 0;
}

.name {
    width: 100%;
    text-align: right;
}

#player-name {
    width: 85%;
}

#jersey-number {
    width: 100%;
}

.player-basics {
    display: flex;
    width: 99%;
    margin: 5px;
}
    

</style>
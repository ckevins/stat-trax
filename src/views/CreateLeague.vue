<template>
    <div class="add-league upper-tab">
        <h2>Create League</h2>
        <div class='form'>  
            <div class='form-head'>
                <label>League Name:</label><br>
                <input id='team-name-input' type="text" v-model='leagueName'/><br>
                <label>Number of Divisions (max 5):</label><br>
                <input id='number-of-divisions' type="number" max="5" min="1" v-model='numberOfDivisions'/>
            </div>
            <div class='division' v-for='division_index in numberOfDivisions' :key='division_index'>
                <div class='division-head'>
                    <label>Division Name:</label><br>
                    <input id='division-name' type="text" v-model='league[division_index-1].divisionName'/><br>
                    <label>Number of teams:</label><br>
                    <input id='division-size' type="number" v-model='divisionSizes[division_index-1]'/>
                </div>
                <div class='teams-parent'>
                    <div class='team-details' v-for='team_index in divisionSizes[division_index-1]' :key='team_index'>
                        <h3>Team {{team_index}}</h3>
                        <label>Team Name: </label><br>
                        <input type="text" v-model="league[division_index-1].teams[team_index-1].nickname"/><br>
                        <label>Primary Color: </label><br>
                        <input type="color" v-model="league[division_index-1].teams[team_index-1].primaryColor"/><br>
                        <h5>Roster</h5>
                        <div class='roster'  v-for='index in rosterSize' :key="index">
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
        this.roster = new Array(15).fill('')
    }
}

export default ({
    data: function () {
        return {
            leagueName: '',
            numberOfDivisions: 1,
            rosterSize: 20,
            divisionSizes: new Array(5).fill(4)     
        }
    },
    computed: {
        league: function () {
            //divisions should be an array filled with arrays
            let divisions = [];
            this.divisionSizes.forEach((divisionSize) => {
                divisions.push({divisionName:'', teams: Array.from({ length:divisionSize }, ()=> new TeamData)})
            })
            return divisions;
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

#division-size {
    width: 50px;
    font-size: 1.4em;
}

.teams-parent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.team-details {
    margin: 10px;
    padding: 0 10px 10px;
    background-color: #1E392A;
    border: 2px solid white
}

.roster {
    display: block
}

#player-name {
    margin: 2px;
}
    

</style>
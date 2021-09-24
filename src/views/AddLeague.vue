<template>
    <div class="add-league upper-tab">
        <h2>Add League</h2>
        <div class='form'>  
            <div class='form-head'>
                <label>League Name:</label><br>
                <input id='team-name-input' type="text" v-model='leagueName'/><br>
                <label>Number of teams:</label><br>
                <input id='league-size' type="number" v-model='numberOfTeams'/>
            </div>
            <div class='teams-parent'>
                <div class='team-details' v-for='team_index in numberOfTeams' :key='team_index'>
                    <h3>Team {{team_index}}</h3>
                    <label>Team Name: </label><br>
                    <input type="text" v-model="teams[team_index-1].nickname"/><br>
                    <label>Primary Color: </label><br>
                    <input type="color" v-model="teams[team_index-1].primaryColor"/><br>
                    <h5>Roster</h5>
                    <div class='roster'  v-for='index in rosterSize' :key="index">
                        <input type="text" placeholder="Last Name, First Name" v-model='teams[team_index-1].roster[index-1]'/>
                        <br>
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
            numberOfTeams: 4,
            rosterSize: 15
        }
    },
    computed: {
        teams: function () {
            return Array.from({ length: this.numberOfTeams }, ()=> new TeamData)
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

#league-size {
    max-width: 50px;
    font-size: 2em
}

.teams-parent {
    display: flex;
    flex-wrap: wrap;
}

.team-details {
    margin: 10px;
    padding: 0 10px 10px;
    border: 5px double #4d926d
}

.roster {
    display: block
}
    

</style>
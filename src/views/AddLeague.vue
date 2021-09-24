<template>
    <div class="add-league">
        <h2>Add League</h2>
        <div class='form'>  
            <div class='form-sub' id='league-name'>
                <label>League Name:</label><input type="text"/><br>
            </div>
            <div id='number-of-teams'>
                <label>Number of teams:</label><input type="number" v-model='numberOfTeams'/>
            </div>
            <div id='team-details' v-for='team_index in numberOfTeams' :key='team_index'>
                <h3>Team {{team_index}}</h3>
                <label>Team Name: </label><input type="text" v-model="teams[team_index-1].nickname"/><br>
                <label>Primary Color: </label><input type="color" v-model="teams[team_index-1].primaryColor"/><br>
            </div>
        </div>
    </div>
</template>

<script>
class TeamData {
    constructor () {
        this.nickname = '';
        this.primaryColor = '#ffffff';
    }
}

export default ({
    data: function () {
        return {
            numberOfTeams: 0
        }
    },
    computed: {
        teams: function () {
            let data = [];
            for (let i=0; i < this.numberOfTeams; i++) {
                data.push(new TeamData())
            }
            return data
        }
    }
})
</script>


<style scoped>
h2 {
    color: white;
    text-align: center;
}
.add-league {
    color: white;
    background-color: #1E392A;
    border: 5px solid #4d926d;
    width: 98%;
    min-height: 75vh;
    margin: auto;
    border-radius: 20px;
    margin-top: -5px;
}

.form {
    width: 80%;
    margin: auto;
}
    

</style>
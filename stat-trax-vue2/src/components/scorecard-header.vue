<template>
    <div class='scorecard-header'>
        <label>Home Team:</label>
        <select name='home-team' id='home-team-select' v-model='gameData.homeTeam' v-on:change='updateData'>
            <option value=''>--Team--</option>
            <option v-for='team in teams' :value='team' :key='team.nickname'> {{ team.nickname }} </option>
        </select>
        <label>Away Team:</label>
        <select name='away-team' id='away-team-select' v-model='gameData.awayTeam' v-on:change='updateData'>
            <option value=''>--Team--</option>
            <option v-for='team in teams' :value='team' :key='team.nickname'>{{ team.nickname }}</option>
        </select>
        <label>Date:</label>
        <input type="date" v-model='gameData.date' v-on:change='updateData'>
        <label>Game Time:</label>
        <select name='gametime' id='gametime-select' v-model='gameData.time' v-on:change='updateData'>
            <option value=''>--Select--</option>
            <option v-for='gametime in gametimeOptions' :value='gametime' :key='gametime'>{{ gametime }}</option>
        </select>
        <label>Weather:</label>
        <select name='weather' id='weather-select' v-model='gameData.weather' v-on:change='updateData'>
            <option value=''>--Select--</option>
            <option v-for='weather in weatherOptions' :value='weather' :key='weather'>{{ weather }}</option>
        </select>
    </div>   
</template>

<script>
export default {
    name: 'ScorecardHeader',
    data: function() {
        return {
            gameData: {
                homeTeam: '',
                awayTeam: '',
                date: '',
                time:'',
                weather: ''
            },
            weatherOptions: [
                'Sunny',
                'Overcast',
                'Rain'
            ],
            gametimeOptions: [
                '1:00pm',
                '4:00pm',
                '7:00pm'
            ]
        }
    },
    methods: {
        updateData: function () {
            this.$emit('update-game-data', this.gameData)
        }
    },
    props: {
        teams: Array,
    }
}
</script>

<style scoped>
    .scorecard-header{
        display: flex;
        justify-content: space-between;
        padding: 40px;
        width: 90%;
        margin: 5px auto 20px auto;
        border: 2px solid white;
        background-color: #1E392A;
        color: white;
        border-radius: 15px;
    }
    label {
        color: #E9C893;
        font-weight: bold;
    }
</style>
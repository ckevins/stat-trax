<template>
    <div class='scorecard-header'>
        <label>Home Team:</label>
        <select name='home-team' id='home-team-select'>
            <option value=''>--Team--</option>
            <option v-for='team in teams' :value='team' :key='team.nickname'> {{ team.nickname }} </option>
        </select>
        <label>Away Team:</label>
        <select name='away-team' id='away-team-select'>
            <option value=''>--Team--</option>
            <option v-for='team in teams' :value='team' :key='team.nickname'>{{ team.nickname }}</option>
        </select>
        <label>Date:</label>
        <input type="date" v-on:change='updateDate'>
        <label>Game Time:</label>
        <select name='gametime' id='gametime-select' v-on:change='updateTime'>
            <option value=''>--Select--</option>
            <option v-for='gametime in gametimeOptions' :value='gametime' :key='gametime'>{{ gametime }}</option>
        </select>
        <label>Weather:</label>
        <select name='weather' id='weather-select'>
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
    props: {
        teams: Array,
    }
}
</script>

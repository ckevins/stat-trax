<template>
    <div>
        <table class='score-board'>
        <tr class='box-totals-head'>
            <th>Box Score</th>
            <th v-for='index in 10' :key='index'>{{ index }}</th>
            <th>R</th>
            <th>H</th>
            <th>E</th>
        </tr>
        <tr>
            <th class='box-team' :style='checkTeamStyling(awayTeamNickname)'> {{ awayTeamNickname }} </th>
            <td v-for='score in awayTeamBoxscore.inningScore' :key='score'> {{score}} </td>
            <td class='box-totals' :style='checkTeamStyling(awayTeamNickname)'> {{ awayTeamBoxscore.score }} </td>
            <td class='box-totals' :style='checkTeamStyling(awayTeamNickname)'> {{ awayTeamBoxscore.hits }}</td>
            <td class='box-totals' :style='checkTeamStyling(awayTeamNickname)'> {{ awayTeamBoxscore.errors}} </td>
        </tr>
        <tr>
            <th class='box-team' :style='checkTeamStyling(homeTeamNickname)'> {{ homeTeamNickname }} </th>
            <td v-for='score in homeTeamBoxscore.inningScore' :key='score'> {{score}} </td>
            <td class='box-totals' :style='checkTeamStyling(homeTeamNickname)'> {{ homeTeamBoxscore.score }} </td>
            <td class='box-totals' :style='checkTeamStyling(homeTeamNickname)'> {{ homeTeamBoxscore.hits }}</td>
            <td class='box-totals' :style='checkTeamStyling(homeTeamNickname)'> {{ homeTeamBoxscore.errors}} </td>
        </tr>
        </table>
    </div>
</template>

<script>
const getTeamBoxscore = (teamData, opponentdata) => {
    let inningScore = new Array(10).fill(0);
    let score = 0;
    let hits = 0;
    let errors = 0;
    teamData.players.forEach(player => {
        player.atbats.forEach((atbat, index) => {
            if (atbat.result === '1B' ||
                atbat.result === '2B' ||
                atbat.result === '3B' ||
                atbat.result === 'HR') {
                    hits+=1
                }
            if (atbat.runner === 4) {
                    inningScore[index] +=1;
                    score += 1
            }
        });
    });
    opponentdata.players.forEach(player => {
        player.atbats.forEach(atbat => {
            if (atbat.result === 'E') {
                errors +=1
            }
        })
    })
    return {
        inningScore,
        score,
        hits,
        errors
    }
}
export default {
    name: 'Boxscore',
    props: {
        homeTeamNickname: String,
        homeTeamData: Object,
        awayTeamNickname: String,
        awayTeamData: Object
    },
    methods: {
        checkTeamStyling: function (teamNickname) {
            if (teamNickname === 'Southern Ryes') {
                return {
                    color: 'white',
                    backgroundColor: 'teal'
                }
            } else if (teamNickname === 'Red Sox') {
                return {
                    color: 'white',
                    backgroundColor: 'red'
                }
            } else if (teamNickname === 'Giants') {
                return {
                    color: 'black',
                    backgroundColor: 'orange'
                }
            }
        }
    },
    computed: {
        homeTeamBoxscore: function () {
            return getTeamBoxscore(this.homeTeamData, this.awayTeamData);
        },
        awayTeamBoxscore: function () {
            return getTeamBoxscore(this.awayTeamData, this.homeTeamData);
        }
    }
}
</script>

<style scoped>
.score-board {
    text-align: center;
    border: 1px solid black;
    color: black;
    margin-top: 2.5%;
}

table {
    width: 50%;
    margin: 10px auto 10px auto;
    background-color: white;
}

th, td {
    border: 1px solid black;
    padding: 5px;
}

.box-totals-head, .box-totals, .box-team {
    font-weight: bold;
    font-size: 1.2em;
}

.box-totals-head {
    background-color: #E9C893;
}


</style>
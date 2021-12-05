<template>
    <div>
        <table class='score-board'>
        <tr class='box-totals-head'>
            <th>Box Score</th>
            <th v-for='index in 10' :key='index'>{{ index }}</th>
            <th>R</th>
            <th>H</th>
            <th>E</th>
            <th>LOB</th>
        </tr>
        <tr>
            <th class='box-team' :style="gameData.awayTeam.info.style"> {{ gameData.awayTeam.info.nickname }} </th>
            <td v-for='(score, index) in awayTeamBoxscore.inningScore' :key='index'> {{score}} </td>
            <td class='box-totals' :style="gameData.awayTeam.info.style"> {{ awayTeamBoxscore.score }} </td>
            <td class='box-totals' :style="gameData.awayTeam.info.style"> {{ awayTeamBoxscore.hits }}</td>
            <td class='box-totals' :style="gameData.awayTeam.info.style"> {{ awayTeamBoxscore.errors}} </td>
            <td class='box-totals' :style="gameData.awayTeam.info.style" id='lob'> {{ awayTeamBoxscore.LOB  }} </td>
        </tr>
        <tr>
            <th class='box-team' :style="gameData.homeTeam.info.style"> {{ gameData.homeTeam.info.nickname }} </th>
            <td v-for='(score, index) in homeTeamBoxscore.inningScore' :key='index'> {{score}} </td>
            <td class='box-totals' :style="gameData.homeTeam.info.style"> {{ homeTeamBoxscore.score }} </td>
            <td class='box-totals' :style="gameData.homeTeam.info.style"> {{ homeTeamBoxscore.hits }}</td>
            <td class='box-totals' :style="gameData.homeTeam.info.style"> {{ homeTeamBoxscore.errors}} </td>
            <td class='box-totals' :style="gameData.homeTeam.info.style" id='lob'> {{ homeTeamBoxscore.LOB }} </td>
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
    let LOB = 0;
    teamData.forEach(player => {
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
            if (atbat.runner !== 4 && atbat.runner !== 0 && atbat.out === 0) {
                    LOB +=1
            }
        });
    });
    opponentdata.forEach(player => {
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
        errors,
        LOB
    }
}
export default {
    name: 'Boxscore',
    props: {
        gameData: Object
    },
    computed: {
        homeTeamBoxscore: function () {
            return getTeamBoxscore(this.gameData.homeTeam.lineup, this.gameData.awayTeam.lineup);
        },
        awayTeamBoxscore: function () {
            return getTeamBoxscore(this.gameData.awayTeam.lineup, this.gameData.homeTeam.lineup)
        }
    }
}
</script>

<style scoped>
.score-board {
    text-align: center;
    border: 1px solid black;
    color: black;
}

table {
    width: 70%;
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

select {
    background-color: white;
    border: 1px solid black;
}


</style>
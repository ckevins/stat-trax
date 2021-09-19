<template>
    <div>
        <table class='score-board'>
        <tr>
            <th>Box Score</th>
            <th v-for='index in 10' :key='index'>{{ index }}</th>
            <th>R</th>
            <th>H</th>
        </tr>
        <tr>
            <th> {{ awayTeamNickname }} </th>
            <td v-for='score in awayTeamBoxscore.inningScore' :key='score'> {{score}} </td>
            <td> {{ awayTeamBoxscore.score }} </td>
            <td> {{ awayTeamBoxscore.hits }}</td>
        </tr>
        <tr>
            <th> {{ homeTeamNickname }} </th>
            <td v-for='score in homeTeamBoxscore.inningScore' :key='score'> {{score}} </td>
            <td> {{ homeTeamBoxscore.score }} </td>
            <td> {{ homeTeamBoxscore.hits }}</td>
        </tr>
        </table>
    </div>
</template>

<script>
const getTeamBoxscore = (teamData) => {
    let inningScore = new Array(10).fill(0);
    let score = 0;
    let hits = 0;
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
    return {
        inningScore,
        score,
        hits
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
    computed: {
        homeTeamBoxscore: function () {
            return getTeamBoxscore(this.homeTeamData);
        },
        awayTeamBoxscore: function () {
            return getTeamBoxscore(this.awayTeamData);
        }
    }
}
</script>

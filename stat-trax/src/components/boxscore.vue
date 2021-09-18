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
            <th> {{ homeTeam.nickname }} </th>
            <td v-for='score in homeTeamBoxscore.inningScore' :key='score'> {{score}} </td>
            <td> {{ homeTeamBoxscore.score }} </td>
            <td> {{ homeTeamBoxscore.hits }}</td>
        </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Boxscore',
    props: {
        homeTeamData: Object,
        awayTeamData: Object
    },
    methods: {
        homeTeamBoxscore: function () {
            let inningScore = new Array(10).fill(0);
            let score = 0;
            let hits = 0
            this.homeTeamData.players.forEach(player => {
                score += (player.starterTally[2] + player.subTally[2]);
                hits += (player.starterTally[1] + player.subTally[1]);
                player.atbats.forEach((atbat, index) => {
                    if (atbat.runner === 4) {
                        inningScore[index] += 1;
                    }
                })
            });
            return {
                score,
                hits,
                inningScore
            };
        }
    }
}
</script>

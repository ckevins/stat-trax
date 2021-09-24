<template>
    <div class='standings'>
        <h2>Standings</h2>
        <table>
            <thead>
                <tr>
                    <th>{{ dummyData.leagueName }}</th>
                    <th>W</th>
                    <th>L</th>
                    <th>PCT.</th>
                    <th>GB</th>
                    <th>L10</th>
                    <th>STRK</th>
                    <th>RS</th>
                    <th>RA</th>
                    <th>DIFF</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for='team in dummyData.teams' :key='team.nickname'>
                    <td>{{team.nickname}}</td>
                    <td>{{team.wins}}</td>
                    <td>{{team.losses}}</td>
                    <td>{{team.percentage}}</td>
                    <td>{{team.gamesBack}}</td>
                    <td>{{team.lastTenRecord[0]}} - {{team.lastTenRecord[1]}}</td>
                    <td>Streak</td>
                    <td>{{team.runsArr[0]}}</td>
                    <td>{{team.runsArr[1]}}</td>
                    <td>{{team.runsArr[2]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
};

const getLastTenRecord = (wins, losses) => {
    let lastTenW;
    let lastTenL;
    if(wins >= 10) {
        let min = (10 - losses);
        let ltw = Math.floor(Math.random() * (10 - min) + min);
        lastTenW = ltw;
        lastTenL = (10 - ltw);
    } else {
        let ltw = Math.floor(Math.random() * wins);
        lastTenW = ltw;
        lastTenL = (10 - ltw);
    }
    return [lastTenW,lastTenL]
}

const getRunsArr = (wins, losses) => {
    let runsScored;
    let runsAllowed;
    if (wins > losses) {
        runsScored = Math.floor(Math.random() * (150-100)+ 100);
        runsAllowed = Math.floor(Math.random() * (110-40) + 40)
    } else {
        runsScored = Math.floor(Math.random() * (110-40) + 40);
        runsAllowed = Math.floor(Math.random() * (150-100) + 100)
    }
    let diff;
    if ((runsScored - runsAllowed) > 0) {
        diff = `+${runsScored-runsAllowed}`
    } else {
        diff = `${runsScored - runsAllowed}`
    }
    return [runsScored, runsAllowed, diff]
}

class dummyTeam {
    constructor (teamName) {
        this.nickname= teamName;
        this.wins= getRandomInt(20);
        this.losses = (20-this.wins);
        this.percentage = (this.wins/ (this.wins+this.losses)).toFixed(3);
        this.differential = this.wins - this.losses;
        this.lastTenRecord = getLastTenRecord(this.wins, this.losses);
        this.runsArr = getRunsArr(this.wins, this.losses)
    }
}

export default {
    data: function() {
        return {
            dummyData: {
                leagueName: "Atlanta Area Senior Men's Baseball League",
                teams: [new dummyTeam("Southern Ryes"), new dummyTeam("Red Sox"), new dummyTeam("Giants"), new dummyTeam("Red Wings")]
            }
        }
    }
}


</script>


<style scoped>
h2 {
    color: white;
    text-align: center;
}
.standings {
    width: 98%;
    min-height: 55vh;
    margin: -5px auto 20px auto;
    border-radius: 20px;
    background-color: #4d926d;
    padding: 10px 0 30px 0;
    border: 5px solid #1E392A;
}

table {
    width: 70%;
    margin: auto;
    background-color: #1E392A;
    padding: 5px;
}

th, td {
    border: 1px solid #1E392A;
    background-color: white;
    color: #1E392A;
}

tbody {
    text-align: center;
}
</style>
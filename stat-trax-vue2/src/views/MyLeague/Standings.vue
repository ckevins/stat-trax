<template>
  <div class="standings">
      <template v-if='loading'>
          <p>Loading<p/>
      </template>
      <template v-else>
          <h1>{{standingsData[0].leagueName}} Standings</h1>
          <div v-for="(division, index) in standingsData[0].divisions" :key='index'>
            <h2>{{division.divisionName}}</h2>
            <v-data-table
              :headers="headers"
              :items="standingsData[0].divisions[index].teams"
              :items-per-page="5"
              :sort-by.sync='sortBy'
              :sort-desc.sync='sortDesc'
              hide-default-footer=true
              class="elevation-1 standings-table"
            ></v-data-table>
          </div>
      </template>
  </div>
</template>

<script>
import db from '../../firebaseInit';

export default {
    data: function() {
        return {
            loading: false,
            standingsData: [],
            headers: [
              {
                text: 'Team',
                align: 'start',
                sortable: false,
                value: 'nickname',
              },
              { text: 'Wins', value: 'wins' },
              { text: 'Losses', value: 'losses' },
              { text: 'PCT', value: 'PCT' },
              { text: 'RS', value: 'RS' },
              { text: 'RA', value: 'RA' },
              { text: 'Diff', value: 'diff' }
            ],
            sortBy: 'PCT',
            sortDesc: true
        }
    },
    created () {
        this.loadLeagueData()
    },
    methods: {
        loadLeagueData() {
            this.loading = true;
            let standings =[];
            const getRandomRecords = () => {
              let wins = Math.floor(Math.random()* (57) + 60);
              let losses = 162 - wins;
              let pct = ((wins/162)).toFixed(3);
              let rs = 0;
              let ra = 0;
              if (wins>losses) {
                rs += Math.floor(Math.random()* (200) + 300);
                ra += Math.floor(Math.random()* (200) + 100);
              } else {
                rs += Math.floor(Math.random()* (200) + 100);
                ra += Math.floor(Math.random()* (200) + 300);
              }
              let diff = rs - ra;
              return [wins, losses, pct, rs, ra, diff]
            }
            db.collection("leagues")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                    standings.push({
                        id: doc.id,
                        leagueName: doc.data().leagueName,
                        divisions: doc.data().divisions.map(divObj => {
                          return {
                            ...divObj,
                            teams: divObj.teams.map(teamObj => {
                              const rand = getRandomRecords()
                              return {
                                ...teamObj,
                                wins: rand[0] , 
                                losses: rand[1], 
                                PCT: rand[2], 
                                RS: rand[3],
                                RA: rand[4],
                                diff: rand[5]
                              }
                            }) 
                          }
                        })
                    });
                    console.log(doc.id, "=>", doc.data())
                    });
                    this.loading = false
                })
                .catch((error)=> {
                    console.log("Error getting documents: ", error);
                    this.loading = false;
                });
            this.standingsData = standings;
        }
    }
}


</script>


<style scoped>
h1, h2 {
  color: white;
  text-align: center;
}
.standings {
  width: 98%;
  min-height: 55vh;
  margin: -5px auto 20px auto;
  border-radius: 10px;
  background-color: #4d926d;
  padding: 10px 0 30px 0;
  border: 5px solid #1e392a;
}

.standings-table {
  width: 60%;
  text-align: center;
  margin: 20px auto;
}

th,
td {
  border: 1px solid #1e392a;
  background-color: white;
  color: #1e392a;
}

td {
  padding: 8px;
}

tbody {
  text-align: center;
}
</style>
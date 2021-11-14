<template>
  <div class="standings">
      <template v-if='loading'>
          <spinner></spinner>
      </template>
      <template v-else>
          <h1>{{leagueData[0].leagueName}} Standings</h1>
          <h2 v-for="division in leagueData[0].divisions" :key='division'>{{ division.divisionName }}</h2>
      </template>
  </div>
</template>

<script>
import db from '../firebaseInit';

export default {
    data: function() {
        return {
            loading: false,
            leagueData: []
        }
    },
    created () {
        this.loadLeagueData()
    },
    methods: {
        loadLeagueData() {
            this.loading = true;
            let data =[];
            db.collection("leagues")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                    data.push({
                        id: doc.id,
                        leagueName: doc.data().leagueName,
                        divisions: doc.data().divisions
                    });
                    console.log(doc.id, "=>", doc.data())
                    });
                    this.loading = false
                })
                .catch((error)=> {
                    console.log("Error getting documents: ", error);
                    this.loading = false;
                });
            this.leagueData = data;
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

table {
  width: 90%;
  margin: auto;
  background-color: #1e392a;
  padding: 5px;
  font-size: 1.5em;
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
<template>
  <div class="league-home">
    <h2>{{ League.name }}</h2>
    <h3 v-for="(division, index) in League.Divisions" :key=index>{{ division.name }}</h3>
    <p>
      This page will display highlights of the standings and statistics pages in
      a more condensed format. The implication of that is that this all of our
      data for those pages will need to be lifted to MyLeague and passed down as
      props.
    </p>
  </div>
</template>

<script>
import gql from "graphql-tag";

const leagueQuery = gql`
  query {
    League(id: 1) {
      name
      Divisions {
        name
        Teams {
            name
        }
      }
    }
  }
`;

export default {
  apollo: {
    League: leagueQuery,
  },
};
</script>


<style scoped>
h2 {
  text-align: center;
}
.league-home {
  width: 98%;
  min-height: 55vh;
  margin: -5px auto 20px auto;
  border-radius: 10px;
  background-color: #4d926d;
  padding: 10px 10px 30px ;
  border: 5px solid #1e392a;
}

p {
  width: 60%;
  margin: auto;
}
</style>
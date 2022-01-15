<template>
  <div class="component">
    <h1>Manage League</h1>
    <div class="parent">
      <div class="team-selectors">
        <h2>{{ League.name }}</h2>
        <div v-for="(division, index) in League.Divisions" :key="index">
          <h3>{{ division.name }}</h3>
          <div
            v-for="(team, teamIndex) in division.Teams"
            :key="teamIndex"
            class="team-select"
            :style="teamStyle(team)"
            @click="selectTeam(team)"
          >
            <h4>{{ team.name }}</h4>
          </div>
        </div>
      </div>
      <EditTeam :team="activeTeam" v-if="editTeam" class="edit-box" @exit-team="exitTeam" />
      <EditLeague v-if="!editTeam" class="edit-box" />
    </div>
  </div>
</template>

<script>
import EditLeague from "@/components/my-league/manage/edit-league.vue";
import EditTeam from "@/components/my-league/manage/edit-team.vue";
import gql from "graphql-tag";

const leagueQuery = gql`
  query {
    League(id: 1) {
      name
      Divisions {
        name
        Teams {
          name
          color
          manager
          Players {
            name
            number
            position
            secPosition
            batsThrows
          }
        }
      }
    }
  }
`;

export default {
  name: "Manage",
  components: {
    EditLeague,
    EditTeam
  },
  apollo: {
    League: leagueQuery,
  },
  data() {
    return {
      editTeam: false,
      activeTeam: {},
    };
  },
  methods: {
    teamStyle(team) {
      return {
        backgroundColor: team.color,
      };
    },
    selectTeam(team) {
      this.editTeam = true;
      this.activeTeam = team;
    },
    exitTeam() {
        this.editTeam = false;
        this.activeTeam = {}
    }
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}

.component {
  width: 98%;
  min-height: 55vh;
  margin: -5px auto 20px auto;
  border-radius: 10px;
  background-color: #4d926d;
  padding: 10px 10px 30px;
  border: 5px solid #1e392a;
}

.parent {
  display: flex;
  justify-content: space-evenly;
}

.team-selectors {
  width: 25%;
  padding-left: 10px;
}

.team-select {
  display: flex;
  height: 75px;
  font-size: 2em;
  justify-content: center;
  align-items: center;
  border: 5px solid white;
  margin: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.team-select:hover {
  transform: scale(1.05);
}

.edit-box {
  width: 60%;
  background-color: white;
  margin: 50px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
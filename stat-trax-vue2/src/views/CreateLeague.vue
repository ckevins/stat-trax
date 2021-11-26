<template>
  <div class="upper-tab">
    <div class="form">
      <div class="form-head">
        <input
          id="league-name-input"
          type="text"
          placeholder="League Name"
          v-model="leagueName"
        />
        <h3># of Divisions: {{ divisions }}</h3>
        <button class="league-size-button" v-on:click="addDivision()">+</button>
        <button class="league-size-button" v-on:click="subtractDivision()">
          -
        </button>
      </div>
      <Division v-for="index in divisions" :key="index" />
      <button id="submit" @click="submitLeague(leagueName, league)">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import db from "../firebaseInit";
import Division from "@/components/create-league/division.vue";

export default {
  components: {
    Division,
  },
  data: function () {
    return {
      leagueName: "",
      divisions: 1,
    };
  },
  methods: {
    addDivision: function () {
      this.divisions++;
    },
    subtractDivision: function () {
      this.divisions--;
    },
    //SUBMIT NEEDS TO ACCESS DATA OF CHILDREN
    submitLeague: function (name, league) {
      db.collection("leagues")
        .add({
          leagueName: name,
          divisions: league.map((obj) => {
            return Object.assign({}, obj);
          }),
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch((error) => {
          console.log("Error writing document: ", error);
        });
    },
  },
};
</script>


<style scoped>
.form {
  padding: 5%;
}

.form-head {
  background-color: white;
  padding: 2.5%;
  width: 45%;
  border: 2px solid #4d926d;
  border-radius: 30px;
  margin: 10px;
}

h3 {
  color: black;
}

#league-name-input {
  font-size: 2em;
  color: black;
  font-weight: bold;
}

button {
  width: 30px;
  height: 30px;
  margin: 5px;
  background-color: #4d926d;
  border: 1px solid #1e392a;
  color: white;
}

#submit {
  width: 45%;
  margin: 10px;
  border-radius: 10px 100px / 120px;
  font-weight: bold;
}
</style>
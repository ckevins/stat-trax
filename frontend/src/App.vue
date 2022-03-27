<template>
  <div id="app" class="flex flex-col min-h-screen">
    <div id="app-header">
      <h1 id="title" class="text-8xl">StatTrax</h1>
      <img id="plate-logo" src="./assets/plate.png" />
    </div>
    <div class="flex-grow">
    <div id="nav">
      <router-link id="link" to="/">Home</router-link>
      <!-- <router-link id="link" to="/leagues">Leagues</router-link>
      <router-link id="link" to="/teams">Teams</router-link> -->
      <router-link id="link" to="/players">Players</router-link>
    </div>
    <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppFooter from './components/AppFooter.vue'

export default {
  components: {
    AppFooter
  }
}
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Saira+Condensed:wght@400;600&display=swap");

body {
  background-color: #3f6b3f;
  margin: 0;
}

#app {
  font-family: "Saira Condensed", sans-serif;
}

#app-header {
  width: 100%;
  height: 250px;
  padding: 25px 0 15px 0;
  background-image: url("./assets/dirt.jpg");
  background-repeat: repeat-x;
  -webkit-text-stroke: 2px black;
  font-weight: bold;
  font-size: 2em;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border-bottom: 15px solid #001d00;
  color: white;
  text-align: right;
}

#title {
  margin: 0;
  padding: 0;
}

#plate-logo {
  height: 75px;
  margin-right: 5%;
  margin-bottom: 10px;
}

#nav {
  padding: 30px;
  font-size: 2em;
  width: 90%;
  margin: auto;
}

#nav a {
  font-weight: bold;
  color: white;
  margin-right: 10%;
  text-decoration: none;
}

#link:hover {
  color: rgb(255, 217, 0);
}

#nav a.router-link-exact-active {
  color: rgb(255, 217, 0);
}

.view {
  width: 90%;
  border-radius: 10px;
  margin: 0 auto 30px;
  padding: 5px 40px;
  border: 1px solid rgb(0, 31, 0);
  background-color: white;
  color: black;
  position: relative;
}

/* .full-component {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
  border: 1px solid rgb(0, 31, 0);
  background-color: white;
  color: black;
  border-radius: 10px;
} */

/* .component-text {
    padding: 5px 40px;
} */
</style>

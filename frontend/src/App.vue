<template>
  <div id="app">
    <div id="app-header">
      <h1 id="title">StatTrax</h1>
      <img id="plate-logo" src="~@/assets/plate.png" />
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/leagues">Leagues</router-link>
      <router-link to="/teams">Teams</router-link>
      <router-link to="/players">Players</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  background-color: rgb(0, 54, 0);
  margin: 0;
}

#app-header {
  width: 100%;
  height: 200px;
  padding: 25px 0 15px 0;
  background-image: url("~@/assets/dirt.jpg");
  background-repeat: repeat-x;
  -webkit-text-stroke: 2px black;
  font-weight: bold;
  font-size: 2em;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  border-bottom: 10px solid rgb(0, 29, 0);
  color: white;
  text-align: right;
}

#title {
  margin: 0;
  padding: 0;
}

#plate-logo {
  height: 75px;
  padding-right: 5%;
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
  padding-right: 10%;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: blanchedalmond;
}

.view {
  width: 90%;
  margin: auto;
  padding: 5px 20px;
  border: 1px solid rgb(0, 31, 0);
  background-color: white;
  color: black;
  position: relative
}
</style>

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
  background-color: rgb(63, 107, 63);
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
  border-bottom: 15px solid rgb(0, 29, 0);
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
  color: rgb(255, 217, 0);
}

.view {
  width: 90%;
  border-radius: 40px;
  margin: auto;
  padding: 5px 20px;
  border: 1px solid rgb(0, 31, 0);
  background-color: white;
  color: black;
  position: relative
}

.actions {
  position: absolute;
  top: 0;
  right: 0;
}

button {
  font-size: 1.5em;
  border-radius: 40px;
  padding: 10px 20px;
  margin: 20px;
  background-image: linear-gradient(
    to left,
    rgba(21, 205, 40, 1) 0%,
    rgba(16, 127, 17, 1) 50%,
    rgba(12, 66, 0, 1) 100%
  );
  background-size: 200% 100%;
  color: white;
  transition: 1.5s;
  border: none;
}

button:hover {
  background-position: 75% 0;
  padding: 10px 60px 10px 20px;
}
</style>

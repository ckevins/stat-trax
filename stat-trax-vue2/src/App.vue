<template>
  <div id="app">
    <div class="app-header">
      <h1 id="title">StatTrax.</h1>
      <img id="plate-logo" src="~@/assets/plate.png" />
    </div>
    <div id="nav">
      <router-link to="/" id="link" exact>Home</router-link>
      <router-link to="/new/league" id="link" exact>New</router-link>
      <router-link to="/my-league/home" id="my-league"
        >My League</router-link
      >
      <router-link to="/my-player/home" id="new">My Player</router-link>
    </div>

    <router-view class="components" />
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#title {
  -webkit-text-stroke: 2px black;
}

body {
  background-color: #1e392a;
  margin: 0;
  min-height: 100vh;
}

h1 {
  margin: 0 0 0 0;
  font-weight: bold;
  font-size: 2.5em;
  color: white;
}

button {
  background-color: white;
  border: 1px solid black;
}

.app-header {
  color: #1e392a;
  background-color: #e9c893;
  text-align: right;
  width: 100%;
  height: 250px;
  margin-right: 30px;
  font-size: 1.5em;
  padding: 25px 0 15px;
  display: flex;
  justify-content: right;
  align-items: flex-end;
  background-image: url("~@/assets/dirt.jpg");
  background-repeat: repeat-x;
}

#plate-logo {
  height: 75px;
  padding-right: 30px;
}

#nav {
  display: flex;
  justify-content: space-evenly;
  width: 60%;
  margin-top: -60px;
}

#link,
#my-league,
#new {
  color: white;
  text-decoration: none;
  background-color: #1e392a;
  border: 5px solid #4d926d;
  font-size: 1.5em;
  padding: 10px 50px;
  border-radius: 10px 10px 0 0;
  z-index: 10;
}

#link:hover,
#my-league:hover,
#new {
  transform: scale(1.05);
  transform-origin: bottom;
}

#link.router-link-exact-active {
  border-bottom: 0px;
  color: #e9c893;
}
#my-league.router-link-active, #new.router-link-active {
  border-bottom: 0px;
  color: #e9c893;
}

.upper-tab {
  color: white;
  position: relative;
  background-color: #1e392a;
  border-top: 5px solid #4d926d;
  width: 100%;
  margin-top: -5px;
  padding-bottom: 50px;
}

.view {
  width: 98%;
  min-height: 55vh;
  margin: -5px auto 20px auto;
  border-radius: 10px;
  background-color: #4d926d;
  padding: 10px 10px 30px;
  border: 5px solid #1e392a;
}
</style>
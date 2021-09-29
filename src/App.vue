<template>
<div class='app'>
  <div class='app-header'>
      <h1>StatTrax</h1>
  </div>
  <div id="nav">
    <router-link to="/" id='link'>Home</router-link> 
    <router-link to="/my-league/league-home" id='link'>My League</router-link> 
    <router-link to="/create-league" id='link'>Create League</router-link>
  </div>
  
  <router-view class='components'/>
</div>
</template>


<style>
html {
  height: 100vh;
}
body {
    background-color: #E9C893;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
h1 {
  margin: 0;
  font-weight: bold;
}

.app-header {
  color: #1E392A;
  text-align: right;
  width: 98%;
  font-size: 1.5em;
  margin: 0 100px 0 0;
  padding: 15px 0 0;
}

#nav {
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  margin-top: -50px;
}

#link {
  color: white;
  text-decoration: none;
  background-color: #1E392A;
  border: 5px solid #4d926d;
  font-size: 1.5em;
  padding: 10px 50px;
  border-radius: 10px 10px 0 0;
  z-index: 10;
}

#link:hover {
  transform: scale(1.05);
  transform-origin: bottom;
}

#link.router-link-active {
  border-bottom: 0px;
  color: #E9C893;
}

.upper-tab {
    color: white;
    background-color: #1E392A;
    border: 5px solid #4d926d;
    width: 98%;
    min-height: 85vh;
    margin: auto;
    border-radius: 10px;
    margin-top: -5px;
}



</style>

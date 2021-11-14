<template>
  <div id="app">
    <div class='app-header'>
        <h1 id='title'>StatTrax.</h1>
        <img id='plate-logo' src='~@/assets/plate.png'/>
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
body {
    background-color: #1E392A;
    margin: 0;
    min-height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
h1 {
  margin: 0 0 0 0;
  font-weight: bold;
  font-size: 2.5em;
  color: white;
}

#title {
  -webkit-text-stroke: 2px black;
}


.app-header {
  color: #1E392A;
  background-color: #E9C893;
  text-align: right;
  width: 100%;
  height: 200px;
  margin-right: 30px;
  font-size: 1.5em;
  padding: 25px 0 15px;
  display: flex;
  justify-content: right;
  align-items: flex-end;
  background-image: url('~@/assets/dirt.jpg');
}

#plate-logo {
  height: 75px;
  padding-right: 30px;
}

#nav {
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  margin-top: -60px;
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
    position: relative;
    background-color: #1E392A;
    border-top: 5px solid #4d926d;
    width: 100%;
    margin-top: -5px;
    padding-bottom: 50px;
}



</style>
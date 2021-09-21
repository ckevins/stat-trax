<template>
<div>
  <div class='app-header'>
      <h1>Stat Trax</h1>
  </div>
  <div id="nav">
    <router-link to="/" id='link'>Home</router-link> 
    <router-link to="/my-league/league-home" id='link'>My League</router-link> 
    <router-link to="/add-league" id='link'>Add League</router-link>
  </div>
  
  <router-view/>
</div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
body {
    background-color: #E9C893;
}

.app-header {
  color: #1E392A;
  text-shadow: 2px 2px 6px #4d926d;
  text-align: center;
  width: 98%;
  margin: auto;
  font-size: 1.5em
}

#nav {
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  margin: auto;
  margin-top: 20px;
}

#link {
  color: #E9C893;
  text-decoration: none;
  background-color: #1E392A;
  border: 5px solid #4d926d;
  font-size: 1.5em;
  padding: 10px 50px;
  border-radius: 20px 20px 0 0;
  z-index: 10;
}

#link.router-link-active {
  border-bottom: 0px;
}


</style>

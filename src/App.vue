<template>
<div>
  <div class='app-header'>
      <h1>Stat Trax</h1>
  </div>
  <div id="nav">
    <router-link to="/" id='link'>Home</router-link> |
    <router-link to="/my-league" id='link'>My League</router-link> |
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
  color: #E9C893;
  text-align: center;
  width: 98%;
  margin: auto;
  background-color: #1E392A;
  border: 5px solid #4d926d;
  border-radius: 20px;
}

#nav {
  color: #1E392A;
  display: flex;
  justify-content: space-evenly;
  width: 50%;
  margin: auto;
  padding-top: 5px;
}

#link {
  color: #1E392A;
  font-size: 1.5em
}


</style>

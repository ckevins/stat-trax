<template>
<div>
  <div class='app-header'>
      <h1>Stat Trax</h1>
  </div>



  <div id="nav">
    <router-link to="/" id='link'>Home</router-link> |
    <router-link to="/Scorecard" id='link'>Scorecard</router-link>
  </div>
  <router-view/>
</div>
  
</template>

<script>



</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
body {
    width: 98%;
    margin: auto;
    background-color: #E9C893;
}

h1, #nav {
    color: #1E392A;
    text-align: center;
}

#link {
  color: #1E392A;
  font-size: 1.5em
}


</style>

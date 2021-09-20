<template>
<div>
  <div class='app-header'>
      <h1>Stat Trax</h1>
  </div>



  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/Scorecard">Scorecard</router-link>
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

h1 {
    color: #1E392A;
}

h2, .app-header {
    text-align: center;
    color: white
}

#help-button {
    height: 50px;
    width: 50px;
    position: absolute;
    top: 15px;
    right: 15px;
    border-radius: 10px;
}
</style>

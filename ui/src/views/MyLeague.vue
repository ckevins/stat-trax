<template>
    <div class='my-league upper-tab'>
        <div id="nav">
            <router-link to='/my-league/league-home' id='sublink' exact>League Home</router-link>
            <router-link to="/my-league/standings" id='sublink' exact>Standings</router-link> 
            <router-link to="/my-league/stats/individual" id='stats'>Stats</router-link> 
            <router-link to="/my-league/schedule" id='sublink' exact>Schedule</router-link>
            <router-link to="/my-league/scorecard" id='sublink' exact>Scorecard</router-link> 
        </div>
        <router-view/>
    </div>
</template>

<style scoped>
h2 {
    color: #1E392A;
    text-align: center;
}



#nav {
  display: flex;
  justify-content: space-evenly;
  width: 70%;
  margin-top: 20px;
}

#sublink, #stats{
    background-color: #4d926d;
    border: 5px solid #1E392A;
    text-decoration: none;
    color: white;
    font-size: 1.5em;
    padding: 10px 30px;
    border-radius: 10px 10px 0 0;
    z-index: 10;
}

#sublink:hover, #stats:hover {
  transform: scale(1.05);
  transform-origin: bottom;
}

#sublink.router-link-exact-active {
  border-bottom: 0px;
  color: #E9C893;
}

#stats.router-link-active {
  border-bottom: 0px;
  color: #E9C893;
}
</style>
<template>
    <div class='my-league'>
        <div id="nav">
            <router-link to='/my-league/league-home' id='sublink' exact>League Home</router-link>
            <router-link to="/my-league/standings" id='sublink' exact>Standings</router-link> 
            <router-link to="/my-league/individual-stats" id='sublink' exact>Individual Stats</router-link> 
            <router-link to="/my-league/team-stats" id='sublink' exact>Team Stats</router-link>
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
.my-league {
    color: white;
    background-color: #1E392A;
    border: 5px solid #4d926d;
    width: 98%;
    min-height: 75vh;
    margin: auto;
    border-radius: 20px;
    margin-top: -5px;
}



#nav {
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin: auto;
  margin-top: 20px;
}

#sublink{
    background-color: #4d926d;
    border: 5px solid #1E392A;
    text-decoration: none;
    color: #E9C893;
    font-size: 1.5em;
    padding: 10px 30px;
    border-radius: 20px 20px 0 0;
    z-index: 10;
}
#sublink.router-link-exact-active {
  border-bottom: 0px;
}
</style>
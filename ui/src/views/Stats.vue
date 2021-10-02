<template>
    <div class='stats'>
        <div class='my-league'>
            <div id="nav">
                <router-link to="/my-league/stats/individual" id='sublink' exact>Individual Stats</router-link> 
                <router-link to="/my-league/stats/team" id='sublink' exact>Team Stats</router-link>
                <router-link to="/my-league/stats/league-leaders" id='sublink' exact>League Leaders</router-link>
            </div>
            <router-view/>
        </div>
    </div>
</template>

<style scoped>

.stats {
    width: 98%;
    min-height: 55vh;
    margin: -5px auto 20px auto;
    border-radius: 10px;
    background-color: #4d926d;
    padding: 10px 0 30px 0;
    border: 5px solid #1E392A;
}

#nav {
  display: flex;
  width: 50%;
  margin-top: 10px;
}

#sublink{
    background-color: #1E392A;
    border: 5px solid #4d926d;
    text-decoration: none;
    color: white;
    font-size: 1.5em;
    padding: 10px 30px;
    border-radius: 10px 10px 0 0;
    z-index: 10;
}

#sublink:hover {
  transform: scale(1.05);
  transform-origin: bottom;
}

#sublink.router-link-exact-active {
  border-bottom: 0px;
  color: #E9C893;
}
</style>
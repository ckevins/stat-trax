<template>
    <div class='my-league'>
        <div id="nav">
            <router-link to="/scorecard" id='sublink'>Scorecard</router-link> 
            <router-link to="/standings" id='sublink'>Standings</router-link> 
            <router-link to="/individual-stats" id='sublink'>Individual Stats</router-link> 
            <router-link to="/team-stats" id='sublink'>Team Stats</router-link>
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
    margin: auto;
    border-radius: 20px;
    margin-top: -5px;
}
#nav {
  display: flex;
  justify-content: space-evenly;
  width: 60%;
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
#sublink.router-link-active {
  border-bottom: 0px;
}
</style>
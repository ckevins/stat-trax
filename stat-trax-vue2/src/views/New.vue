<template>
    <div class='my-league upper-tab'>
        <div id="nav">
            <router-link to='/new/league' id='sublink' exact>New League</router-link>
            <router-link to="/new/player" id='sublink' exact>New Player</router-link> 
        </div>
        <router-view/>
    </div>
</template>

<style scoped>
h2 {
  color: #1e392a;
  text-align: center;
}

#nav {
  display: flex;
  justify-content: space-evenly;
  width: 70%;
  margin-top: 20px;
}

#sublink,
#stats {
  background-color: #4d926d;
  border: 5px solid #1e392a;
  text-decoration: none;
  color: white;
  font-size: 1.5em;
  padding: 10px 30px;
  border-radius: 10px 10px 0 0;
  z-index: 10;
}

#sublink:hover,
#stats:hover {
  transform: scale(1.05);
  transform-origin: bottom;
}

#sublink.router-link-exact-active {
  border-bottom: 0px;
  color: #e9c893;
}

#stats.router-link-active {
  border-bottom: 0px;
  color: #e9c893;
}
</style>
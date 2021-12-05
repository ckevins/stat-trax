<template>
  <div class="my-player upper-tab">
    <div id="nav">
      <router-link to="/my-player/home" id="sublink" exact>
        Home
      </router-link>
      <router-link to="/my-player/scorecard" id="sublink" exact>
        Scorecard
      </router-link>
    </div>
    <router-view />
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

#sublink {
  background-color: #4d926d;
  border: 5px solid #1e392a;
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
  color: #e9c893;
}
</style>
<template>

    <div>
        <h2>My League</h2>
    </div>
    <div id="nav">
        <router-link to="/scorecard" id='link'>Scorecard</router-link> |
        <router-link to="/standings" id='link'>Standings</router-link> |
        <router-link to="/individual-stats" id='link'>Individual Stats</router-link> | 
        <router-link to="/team-stats" id='link'>Team Stats</router-link>
    </div>
    <router-view/>


</template>

<style scoped>
h2 {
    color: #1E392A;
    text-align: center;
}
</style>
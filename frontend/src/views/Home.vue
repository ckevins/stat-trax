<template>
  <div class="home view">
    <div class="w-1/2 m-auto">
      <h1 class="text-5xl p-5 rounded-lg text-center">Welcome to StatTrax</h1>
      <p class="text-xl">A baseball application for bookkeeping and statistics tracking.</p>
      <p class="text-xl">
        StatTrax is designed to accomodate you with the features you need.  There are three different types of user accounts available each with their own set of features:
      </p>
    </div>
    <div class="flex justify-between items-strecth">
      <div class="card basis-1/3 m-5 p-5 rounded-lg">
        <h2 class="text-3xl text-center pb-4">Leagues</h2>
        <ul class="text-xl mx-4">
          <li>Standings</li>
          <li>Roster control for all teams</li>
          <li>Statistic Tracking for all players</li>
          <li>League Leaders Board</li>
          <li>Scorecard Entry for all teams</li>
        </ul>
      </div>
      <div class="card basis-1/3 m-5 p-5 rounded-lg">
        <h2 class="text-3xl text-center pb-4">Teams</h2>
        <ul class="text-xl mx-4">
          <li>Roster control for your team</li>
          <li>Statistic Tracking for your team's players</li>
          <li>Scorecard Entry for your games only</li>
        </ul>
      </div>
      <div class="card basis-1/3 m-5 p-5 rounded-lg">
        <h2 class="text-3xl text-center pb-4">Players</h2>
        <ul class="text-xl mx-4">
          <li>Statistic Tracking for a single player</li>
          <li>Minimalistic Scorecard Entry for a single player</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
ul {
  list-style-type: square
}

.card {
  background-color: #001d00;
  color: white;
}
</style>

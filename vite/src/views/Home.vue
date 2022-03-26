<template>
  <div class="home view">
    <h1>Welcome to StatTrax</h1>
    <p>A baseball application for bookkeeping and statistics.</p>
    <p>
      StatTrax is designed to accommodate for three different types of users and
      each user has access to a different level of features that are relevant to
      them:
    </p>
    <ul>
      <li>Leagues</li>
      <ul>
        <li>Standings</li>
        <li>Roster control for all teams</li>
        <li>Statistic Tracking for all players</li>
        <li>League Leaders Board</li>
        <li>Scorecard Entry for all teams</li>
      </ul>
      <li>Teams</li>
      <ul>
        <li>Roster control for your teams</li>
        <li>Statistic Tracking for your team's players</li>
        <li>Scorecard Entry for your games only</li>
      </ul>
      <li>Players</li>
      <ul>
        <li>Statistic Tracking for a single playing</li>
        <li>Minimalistic Scorecard Entry for a single player</li>
      </ul>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
p,
li {
  font-size: 1.5em;
}
</style>

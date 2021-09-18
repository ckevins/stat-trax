<template>
    <div class='help'>
        <button v-on:click='toggleHelp' id='help-x'> X </button>
        <h2 style='color:white'>Help:</h2>
        <h3>Getting Started:</h3>
        <ul>
            <li>To begin, select the team that you are entering a scorecard for at the top of the page.</li>
            <li>Next, select how many players will be starting (or how many will be hitting in your batting order).</li>
            <li>Then, select this game's date, time, opponent, and weather conditions.</li>
        </ul>
        <h3>Line-ups:</h3>
        <ul>
            <li>Once you've selected your team, you can select your starters and subs as well as their positions in the far left column.</li>
            <li>If an at-bat in the inning column was taken by the sub, be sure to check the sub box in the bottom right corner of each at-bat box.</li>
        </ul>
        <h3>At-Bats:</h3>
        <ul>
            <li>Select the result of each at-bat using the result drop-down box.</li>
            <li>Some results such as groundouts, double plays, and flyouts will cause an additional box to appear where you can enter notes such as 6-4-3 or F7.</li>
            <li>Bases can be clicked to indicate the baserunner's progress.</li>
            <li>Some results such as 1B, 2B, 3B, HR, or BB will automatically fill in the corresponding bases.</li>
            <li>If a base is clicked by mistake, clicking another base will overwrite the previous selection.</li>
            <li>To erase the baserunner's progress completely, click the currently selected base again.</li>
            <li>RBIs, stolen bases, and outs can be tracked in each at-bats box as well.</li>
            <li>To indicate that a run is scored, all you need to do is make sure that home plate is your selected base (all bases colored in).</li>
            <li>As you fill in at-bats, each player's cumulative stats for the game will be automaticall tabulated in the far right column.</li>
        </ul>
        <h3>Innings:</h3>
        <ul>
            <li>Only 5 innings can be viewed at a time.</li>
            <li>To scroll across innings, press the arrow buttons.</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Help',
    props: {
        toggleHelp: Function
    }
}
</script>

<style scoped>
.help {
    color: white;
    position: fixed;
    top: 12.5%;
    left: 12.5%;
    text-align: left;
    height: 75%; 
    width: 75%;
    align-content: center;
    background-color: rgba(0, 0, 0, 0.904);
    border: 5px solid white;
    padding: 0 10px 0 10px;
    z-index: 100;
}

#help-x {
    position: absolute;
    height: 30px;
    width: 30px;
    top: 5px;
    right: 5px;
}

</style>

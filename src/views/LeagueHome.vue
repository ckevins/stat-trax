<template>
    <div class='league-home'>
        <h2>{{ dummyData.leagueName }}</h2>
        <p>This page will display highlights of the standings and statistics pages in a more condensed format. The implication of that is that this all of our data for those pages will need to be lifted to MyLeague and passed down as props.</p>
    </div>
</template>

<script>
export default {
    data: function() {
        return {
            dummyData: {
                leagueName: "Atlanta Area Senior Men's Baseball League"
            }
        }
    }
}
</script>


<style scoped>
h2 {
    text-align: center;
}
.league-home {
    width: 98%;
    min-height: 55vh;
    margin: -5px auto 20px auto;
    border-radius: 20px;
    background-color: #4d926d;
    padding: 10px 0 30px 0;
    border: 5px solid #1E392A;
}

p {
    width: 60%;
    margin: auto;
}
</style>
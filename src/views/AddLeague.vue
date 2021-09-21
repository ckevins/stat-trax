<template>
    <div class="add-league">
        <h2>Add League</h2>
        <div class='form'>  
            <div class='form-sub' id='league-name'>
                <label>League Name:</label><input type=text/><br>
            </div>
            <div id='number-of-teams'>
                <label>Number of teams:</label><input type=number/>
            </div>
        </div>
    </div>
</template>

<style scoped>
h2 {
    color: white;
    text-align: center;
}
.add-league {
    color: white;
    background-color: #1E392A;
    border: 5px solid #4d926d;
    width: 98%;
    margin: auto;
    border-radius: 20px;
    margin-top: -5px;
}

.form {
    width: 80%;
    margin: auto;
}
    

</style>
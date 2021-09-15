class ABData {
    constructor () {
        this.rbi = 0;
        this.sb = null;
        this.result = '';
        this.note = null;
        this.out = null;
        this.runner = 0;
    }
    get baseColors() {
        if (this.runner === 0) {
            return ['white', 'white', 'white', 'white']
        } else if (this.runner === 1){
            return ['red', 'white', 'white', 'white']
        } else if (this.runner === 2) {
            return ['red', 'red', 'white', 'white']
        } else if (this.runner === 3) {
            return ['red', 'red', 'red', 'white']
        } else if (this.runner === 4) {
            return ['red', 'red', 'red', 'red']
        }
    }
}

class playerGameData {
    constructor (player, pos) {
        this.player = player;
        this.position = pos;
        this.atbats = [
            new ABData(),
            new ABData(),
            new ABData(),
            new ABData(),
            new ABData(),
            new ABData(),
            new ABData(),
            new ABData(),
            new ABData(),
            new ABData()
        ];
    }
    get ABs () {
        let count = 0;
        this.atbats.forEach(element => {
            if (element.result !== null && 
                element.result !== '' &&
                element.result !== 'BB' && 
                element.result !== 'HBP' && 
                element.result !== 'SF' &&
                element.result !== 'SH') {
                count += 1;
            }
        });
        return count;
    }
    get hits () {
        let count = 0;
        this.atbats.forEach(element => {
            if (element.result === '1B' ||
                element.result === '2B' || 
                element.result === '3B' || 
                element.result === 'HR') {
                count += 1;
            }
        });
        return count;
    }
    get runs () {
        let count = 0;
        this.atbats.forEach(element => {
            if (element.runner === 4) {
                count += 1
            }
        })
        return count
    }
    get rbi () {
        let count = 0;
        this.atbats.forEach(element => {
            if (element.rbi !== '0') {
                count += element.rbi
            }
        })
        return count
    }
}

var player1 = new playerGameData();
var player2 = new playerGameData();
var player3 = new playerGameData();
var player4 = new playerGameData();
var player5 = new playerGameData();
var player6 = new playerGameData();
var player7 = new playerGameData();
var player8 = new playerGameData();
var player9 = new playerGameData();
var player10 = new playerGameData();

var app = new Vue({
    el: '#app',
    data: {
        teams: [{
                nickname: 'Southern Ryes',
                players: [
                    'Noah Echols', 
                    'Steve Wyre', 
                    'Matt Peterson', 
                    'Seamus Bourne', 
                    'Jason Pulley', 
                    'Cody Evins', 
                    'Ryan Silver',
                    'Tomo Yamahara',
                    'Andrew Daniels'],
                opponents: ['Red Sox', 'Red Wings', 'Giants']
            },
            {
                nickname: 'Red Sox',
                players: [
                    'John Smith',
                    'Tommy Johnson',
                    'Brad Hunlker',
                    'Blake Warren',
                    'Tim Jordan',
                    'Daniel Isaacs',
                    'John Adams',
                    'George Washington',
                    'Thomas Jefferson'
                ],
                opponents: ['Red Wings', 'Giants', 'Southern Ryes']
            }
        ],
        activeTeam: 'Southern Ryes',
        visibility: {
            scorecardSeen: true,
            inningRange: 0
        },
        scorecardEntry: {
            weathers: ['Sunny', 'Overcast', 'Rain'],
            gametimes: ['1:00pm', '4:00pm', '7:00pm'],
            positions: [
                'P', 
                'C', 
                '1B', 
                '2B', 
                '3B', 
                'SS', 
                'RF', 
                'CF', 
                'LF', 
                'DH', 
                'Sub'],
            statLines: 
                ['AB', 
                'H', 
                '1B', 
                '2B', 
                '3B', 
                'HR', 
                'RBI', 
                'SO', 
                'BB', 
                'HBP', 
                'R', 
                'E'],
            results: [
                '1B',
                '2B',
                '3B',
                'HR',
                'BB',
                'K',
                'Kc',
                'HBP',
                'G',
                'U',
                'F',
                'L',
                'FF',
                'FO',
                'DP',
                'FC',
                'SF',
                'SH']
        },
        currentGameData: {
            gameID: null,
            player: [
                player1, 
                player2, 
                player3, 
                player4, 
                player5,
                player6,
                player7,
                player8,
                player9,
                player10
            ]
        }
    },
    methods: {
        createGameID: function (event) {
            this.currentGameData.gameID = `${this.activeTeam.nickname.toLowerCase().replace(' ', '')}${event.target.value.replace(/-/gi,'')}`;
            console.log(this.currentGameData.gameID);
        },
        updateGameID: function (event) {
            let timeString = event.target.value.replace(':', '').replace('pm', '');
            let id = this.currentGameData.gameID;
            if (id !== null && id.slice(-2) !== '00') {
                console.log('block 1 ran');
                console.log(id);
                this.currentGameData.gameID = id.concat(timeString)
            } else if (id !== null && id.slice(-2) === '00') {
                console.log('block 2 ran');
                this.currentGameData.gameID = id.slice(0,-3).concat(timeString)
            } else {
                console.log('block 3 ran');
                this.currentGameData.gameID = timeString;
            }
        },
        checkInningRange: function (index) {
            if (this.visibility.inningRange < index && index < this.visibility.inningRange + 6){
                return true
            } else {
                return false
            }
        },
        toggleInningRangeDown: function () {
            if(this.visibility.inningRange !== 0) {
                this.visibility.inningRange -= 1;
            }
        },
        toggleInningRangeUp: function () {
            if(this.visibility.inningRange !== 5)
            this.visibility.inningRange += 1;
        },
        checkButtonStyle: function (base, row, inning) {
            let color= this.currentGameData.player[row-1].atbats[inning-1].baseColors[base];
            return {
                backgroundColor: color
            }
        },
        updateRunner: function (base, row, inning) {
            if (this.currentGameData.player[row-1].atbats[inning-1].runner === base) {
                this.currentGameData.player[row-1].atbats[inning-1].runner = 0;
            } else {
                this.currentGameData.player[row-1].atbats[inning-1].runner = base;
            }
            
        }
    }
})
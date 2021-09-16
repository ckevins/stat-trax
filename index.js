class ABData {
    constructor () {
        this.rbi = 0;
        this.sb = 0;
        this.result = '';
        this.note = null;
        this.out = 0;
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
    get tally () {
        let abs = 0;
        this.atbats.forEach(element => {
            if (element.result !== null && 
                element.result !== '' &&
                element.result !== 'BB' && 
                element.result !== 'HBP' && 
                element.result !== 'SF' &&
                element.result !== 'SH') {
                abs += 1;
            }
        });
        let hits = 0;
        let bbs = 0;
        let ks = 0;
        let hbp = 0;
        this.atbats.forEach(element => {
            if (element.result === '1B' ||
                element.result === '2B' || 
                element.result === '3B' || 
                element.result === 'HR') {
                hits += 1;
            } else if (element.result === 'BB') {
                bbs += 1;
            } else if (element.result === 'K' || element.result === 'Kc') {
                ks += 1;
            } else if (element.result === 'HBP') {
                hbp += 1;
            }
        });
        let runs = 0;
        this.atbats.forEach(element => {
            if (element.runner === 4) {
                runs += 1
            }
        });
        let rbis = 0;
        this.atbats.forEach(element => {
            if (element.rbi !== '0') {
                rbis += element.rbi
            }
        });
        return [abs, hits, runs, rbis, bbs, hbp, ks]
    }

}

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
        activeTeam: '',
        visibility: {
            help: false,
            scorecardSeen: true,
            inningRange: 0
        },
        scorecardEntry: {
            weathers: [
                'Sunny', 
                'Overcast', 
                'Rain'],
            gametimes: [
                '1:00pm', 
                '4:00pm', 
                '7:00pm'],
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
                'DH'
            ],
            tallies: 
                ['AB', 
                'H',
                'R',
                'RBI',
                'BB',
                'HBP',
                'K'
                ],
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
            opponent: '',
            weather: '',
            startersCount: 9,
            player: [
                new playerGameData('',''),
                new playerGameData('',''),
                new playerGameData('',''),
                new playerGameData('',''),
                new playerGameData('',''),
                new playerGameData('',''),
                new playerGameData('',''),
                new playerGameData('',''),
                new playerGameData('',''),
                new playerGameData('','')
            ],
            sub: [
                new playerGameData('Sub',''),
                new playerGameData('Sub',''),
                new playerGameData('Sub',''),
                new playerGameData('Sub',''),
                new playerGameData('Sub',''),
                new playerGameData('Sub',''),
                new playerGameData('Sub',''),
                new playerGameData('Sub',''),
                new playerGameData('Sub',''),
                new playerGameData('Sub','')
            ]
        }
    },
    methods: {
        toggleHelp: function () {
            if (this.visibility.help === false) {
                this.visibility.help = true;
            } else {
                this.visibility.help = false;
            }
        },
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
            
        },
        resultUpdateRunner: function (event, row, inning) {
            console.log(event.target.value);
            if(event.target.value === '1B' ||
            event.target.value === 'BB' ||
            event.target.value === 'HBP') {
                this.currentGameData.player[row-1].atbats[inning-1].runner = 1
            } else if (event.target.value === '2B') {
                this.currentGameData.player[row-1].atbats[inning-1].runner = 2
            } else if (event.target.value === '3B') {
                this.currentGameData.player[row-1].atbats[inning-1].runner = 3
            } else if (event.target.value === 'HR') {
                this.currentGameData.player[row-1].atbats[inning-1].runner = 4
            }
        }
    },
    computed: {
        starters: function () {
            return new Array(this.currentGameData.startersCount)
        }
    }
})
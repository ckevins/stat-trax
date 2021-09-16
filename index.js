class ABData {
    constructor () {
        this.rbi = 0;
        this.sb = 0;
        this.result = '';
        this.note = null;
        this.noteVisibility = false;
        this.out = 0;
        this.runner = 0;
        this.sub = false;
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

const getAtBats = (atbats, subBool) => {
    abs = 0;
    atbats.forEach(element => {
        if (element.sub === subBool) {
            if (element.result !== null && 
                element.result !== '' &&
                element.result !== 'BB' && 
                element.result !== 'HBP' && 
                element.result !== 'SF' &&
                element.result !== 'SH') {
                    abs += 1;
                }
        }
    })
    return abs;
}

const getResults = (atbats, subBool) => {
    hits = 0;
    bbs = 0;
    hbps = 0;
    ks = 0;
    atbats.forEach(element => {
        if (element.sub === subBool) {
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
                hbps += 1;
            }
        }
    });
    return [hits, bbs, hbps, ks]
}

const getRuns = (atbats, subBool) => {
    runs = 0;
    atbats.forEach(element => {
        if (element.sub === subBool) {
            if (element.runner === 4) {
                runs += 1
            }
        }
    });
    return runs
}

const getRbis = (atbats, subBool) => {
    rbis = 0;
    atbats.forEach(element => {
        if (element.sub === subBool) {
            if (element.rbi !== '0') {
                rbis += element.rbi
            }
        }
    })
    return rbis;
}


class playerGameData {
    constructor () {
        this.player = '';
        this.position = '';
        this.sub = '';
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
    get starterTally () {
        let abs = getAtBats(this.atbats, false);
        let [hits, bbs, hbps, ks] = getResults(this.atbats, false);
        let runs = getRuns(this.atbats, false);
        let rbis = getRbis(this.atbats, false);
        return [abs, hits, runs, rbis, bbs, hbps, ks]
    }
    get subTally () {
        let abs = getAtBats(this.atbats, true);
        let [hits, bbs, hbps, ks] = getResults(this.atbats, true);
        let runs = getRuns(this.atbats, true);
        let rbis = getRbis(this.atbats, true);
        return [abs, hits, runs, rbis, bbs, hbps, ks]
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
                    'Alan Benes',
                    'Christopher Douglas',
                    'Evan Franklin',
                    'Gregory Hughes',
                    'Ian Jackson',
                    'Kenneth Lewis',
                    'Michael Nicholson',
                    'Oscar Pena',
                    'Quinn Rothschild'
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
                new playerGameData(),
                new playerGameData(),
                new playerGameData(),
                new playerGameData(),
                new playerGameData(),
                new playerGameData(),
                new playerGameData(),
                new playerGameData(),
                new playerGameData(),
                new playerGameData()
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
            let atbat = this.currentGameData.player[row-1].atbats[inning-1];
            if (atbat.runner === base) {
                atbat.runner = 0;
            } else {
                atbat.runner = base;
            }
            
        },
        resultUpdateRunnerNote: function (event, row, inning) {
            console.log(event.target.value);
            let result = event.target.value;
            let atbat = this.currentGameData.player[row-1].atbats[inning-1];
            if(result === '1B' ||
            result === 'BB' ||
            result === 'HBP') {
                atbat.runner = 1;
                atbat.noteVisibility = false
            } else if (result === '2B') {
                atbat.runner = 2;
                atbat.noteVisibility = false
            } else if (result === '3B') {
                atbat.runner = 3;
                atbat.noteVisibility = false
            } else if (result === 'HR') {
                atbat.runner = 4;
                atbat.noteVisibility = false
            } else if (result === 'K' ||
            result === 'Kc' ||
            result === '') {
                atbat.runner = 0;
                atbat.noteVisibility = false
            } else {
                atbat.runner = 0;
                atbat.noteVisibility = true
            }
        },
        updateNote: function (event, row, inning) {
            console.log(event.target.value);
            this.currentGameData.player[row-1].atbats[inning-1].note = event.target.value;
        },
        toggleSub: function (row, inning) {
            console.log('Toggle Sub!')
            let subStatus = this.currentGameData.player[row-1].atbats[inning-1].sub;
            if (subStatus) {
                this.currentGameData.player[row-1].atbats[inning-1].sub = false
            } else {
                this.currentGameData.player[row-1].atbats[inning-1].sub = true
            }
        }
    },
    computed: {
        starters: function () {
            return new Array(this.currentGameData.startersCount)
        }
    }
})
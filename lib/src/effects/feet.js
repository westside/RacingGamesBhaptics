class Feet {
    constructor(tactPlay, options) {
        this.tactPlay = tactPlay
        this.options = options
    }

    handle(gameData) { 
        // strong brake
        let local = gameData.localAcc;
        let top = Math.round(local[2]);

        //gas
        if (gameData.speed < 20 && gameData.throttle !== 0) {
            this.tactPlay.playEffect((top > 0.6) ? 'ACCELERATION_A' : 'ACCELERATION_B', {intensity:gameData.throttle, duration:this.options['duration']})
        }
    }
}

module.exports = Feet
class Feet {
    constructor(tactPlay, options) {
        this.tactPlay = tactPlay
        this.options = options
        this.gear = null
        this.last = null
        this.prevSus = [0,0,0,0]
        this.prevSpeed = 0
    }

    handle(gameData) { 
        let local = gameData.localAcc;
        let top = Math.round(local[2]);

        // strong brake
        if(this.prevSpeed - gameData.speed > 0.75 && gameData.speed != 0) {
            console.log('BRAKE', gameData.speed, this.prevSpeed)
            this.tactPlay.playEffect('BRAKE',this.options)
        }

        // gas
        if (gameData.throttle > 0) {
            console.log('ACCELERATION_E', gameData.throttle)
            this.tactPlay.playEffect('ACCELERATION_E', {intensity:0.5, duration:this.options['duration']})
        }

        if (gameData.speed > 2 && gameData.speed > this.prevSpeed) {
            const intensity = gameData.speed / 100
            console.log('ACCELERATION_F')
            this.tactPlay.playEffect('ACCELERATION_F', {intensity: (intensity < 4) ? intensity : 4, duration:this.options['duration']})
        }

        if (gameData.speed != 0)
        {
            this.prevSpeed = gameData.speed;
        }

        // clutch engage
        
        if(this.gear != null && this.gear != gameData.gear && gameData.gear != 0) {
            console.log('CLUTCH_ENGAGE ' + gameData.gear + " " + this.gear)
            this.tactPlay.playEffect('CLUTCH_ENGAGE', this.options)
        }
        if (gameData.gear != 0)
        {
            this.gear = gameData.gear
        }

        // wheel shock absorber
        let diff = 0.01;        

        if(gameData.susHeight[0] != 0)
        {
            if(Math.abs(gameData.susHeight[0] - this.prevSus[0]) > diff) {
                console.log('wheel_shock_absorber_LEFT_FRONT_C')
                this.tactPlay.playEffect('wheel_shock_absorber_LEFT_FRONT_C',this.options)
            }            
            
            if(Math.abs(gameData.susHeight[1] - this.prevSus[1]) > diff) {
                this.tactPlay.playEffect('wheel_shock_absorber_RIGHT_FRONT_C',this.options)
            } 
            
            if(Math.abs(gameData.susHeight[2] - this.prevSus[2]) > diff) {
                this.tactPlay.playEffect('wheel_shock_absorber_RIGHT_BACK_C',this.options)
            } 
            
            if(Math.abs(gameData.susHeight[3] - this.prevSus[3]) > diff) {
                this.tactPlay.playEffect('wheel_shock_absorber_LEFT_BACK_C',this.options)
            } 
            
            this.prevSus = gameData.susHeight;
        }
    }
}

module.exports = Feet
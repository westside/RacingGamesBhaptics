class Feet {
    constructor(tactPlay, options) {
        this.tactPlay = tactPlay
        this.options = options
        this.gear = null
        this.last = null
        this.prevSus = [0,0,0,0]
        this.prevSpeed = 0
        this.speedOnGearShift = 0
        this.maxThrottle = 1
    }

    handle(gameData) { 
        let local = gameData.localAcc;
        let top = Math.round(local[2]);

        // strong brake
        if(this.prevSpeed - gameData.speed > 0.45 && gameData.speed != 0) {
            //console.log('BRAKE', this.prevSpeed - gameData.speed)
            this.tactPlay.playEffect('BRAKE_FEET',this.options)
        }

        // gas
        if (gameData.throttle > 0) {
            if (gameData.throttle > this.maxThrottle)
            {
                this.maxThrottle = gameData.throttle
            }
            const f_int = gameData.throttle / this.maxThrottle;
            this.tactPlay.playEffect('ACCELERATION_E_FEET', {intensity: f_int * 0.75, duration:this.options['duration']})
        }

        if (gameData.speed > 2 && gameData.speed > this.prevSpeed) {
            let intensity = (gameData.speed - this.speedOnGearShift) / 25
            this.tactPlay.playEffect('ACCELERATION_F_FEET',
                {intensity: (intensity < 4) ? ((intensity < 0.2) ? 0.2 : intensity ) : 4, duration:this.options['duration']})
        }

        if (gameData.speed != 0)
        {
            this.prevSpeed = gameData.speed;
        }

        // clutch engage
        
        if(this.gear != null && this.gear != gameData.gear && gameData.gear != 0) {
            this.tactPlay.playEffect('CLUTCH_ENGAGE_FEET', {intensity:0.75, duration:this.options['duration']})
            if (gameData.gear != 0 && gameData.gear != 96)
            {
                this.speedOnGearShift = (this.gear < gameData.gear) ? gameData.speed : 0;
            }
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
                //console.log('wheel_shock_absorber_LEFT_FRONT_C')
                this.tactPlay.playEffect('wheel_shock_absorber_LEFT_FRONT_C_FEET', {intensity:0.75, duration:this.options['duration']})
            }            
            
            if(Math.abs(gameData.susHeight[1] - this.prevSus[1]) > diff) {
                this.tactPlay.playEffect('wheel_shock_absorber_RIGHT_FRONT_C_FEET', {intensity:0.75, duration:this.options['duration']})
            } 
            
            if(Math.abs(gameData.susHeight[2] - this.prevSus[2]) > diff) {
                this.tactPlay.playEffect('wheel_shock_absorber_RIGHT_BACK_C_FEET', {intensity:0.75, duration:this.options['duration']})
            } 
            
            if(Math.abs(gameData.susHeight[3] - this.prevSus[3]) > diff) {
                this.tactPlay.playEffect('wheel_shock_absorber_LEFT_BACK_C_FEET', {intensity:0.75, duration:this.options['duration']})
            } 
            
            this.prevSus = gameData.susHeight;
        }
    }
}

module.exports = Feet
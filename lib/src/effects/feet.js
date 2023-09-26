class Feet {

    prevLocalAcc = 0;

    constructor(tactPlay, options) {
        this.tactPlay = tactPlay
        this.options = options
        this.gear = null
        this.last = null
        this.prevSus = [0,0,0,0]
    }

    handle(gameData) { 
        let local = gameData.localAcc;
        let top = Math.round(local[2]);
        let gForce = Math.sqrt(Math.pow(local[0],2)+Math.pow(local[1],2)+Math.pow(local[2],2)) / 9.80665; //intensité vibration
        
        let negForce = Math.abs(this.options["intensity"]*gForce*0.1)

        if(negForce < 0.2) negForce = 0.2;
        if(negForce > 5) negForce = 5;

        let negOptions = {intensity:negForce, duration:this.options['duration']}
        
        // strong brake
        if(top != 0 && Math.sign(top) == -1) {
            this.tactPlay.playEffect('BRAKE',negOptions)
        } else if (top != 0) {
            this.tactPlay.playEffect('ACCELERATION_F',negOptions)
        }

        // gas
        if (gameData.speed < 20 && gameData.throttle !== 0) {
            // this.tactPlay.playEffect('ACCELERATION_E', {intensity:gameData.throttle, duration:this.options['duration']})
            this.tactPlay.playEffect((top > 0.6) ? 'ACCELERATION_FAST' : 'ACCELERATION_PROGRESSIVE', {intensity:gameData.throttle, duration:this.options['duration']})
        }

        // clutch engage
        if(gameData.gear != 0 && gameData.gear != gameData.nGear && this.gear != gameData.nGear) {
            if(this.gear != null) {
                this.tactPlay.playEffect('CLUTCH_ENGAGE',this.options)
            }

            this.gear = gameData.gear
        }

        // wheel shock absorber

        let newOptions = {intensity:this.options['intensity'], duration:this.options['duration']};
        
        if(Math.abs(gameData.susHeight[0] - this.prevSus[0]) > 5) {
            this.tactPlay.playEffect('wheel_shock_absorber_LEFT_FRONT_C',newOptions)
        }            
        
        if(Math.abs(gameData.susHeight[1] - this.prevSus[1]) > 5) {
            this.tactPlay.playEffect('wheel_shock_absorber_RIGHT_FRONT_C',newOptions)
        } 
        
        if(Math.abs(gameData.susHeight[2] - this.prevSus[2]) > 5) {
            this.tactPlay.playEffect('wheel_shock_absorber_RIGHT_BACK_C',newOptions)
        } 
        
        if(Math.abs(gameData.susHeight[3] - this.prevSus[3]) > 5) {
            this.tactPlay.playEffect('wheel_shock_absorber_LEFT_BACK_C',newOptions)
        } 

        this.prevSus = gameData.susHeight;
    }
}

module.exports = Feet
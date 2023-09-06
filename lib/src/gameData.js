

class GameData {
    constructor(json,staticData) {
        this.timestamp = Date.now()
        this.data = json.data
        this.type = json.type
        this.gear = 0               // current gear active ?
        this.nGear = staticData.nGear
        this.crash = 0
        this.localAcc = [0,0,0]     // m/s² Vector 
        this.speed = 0              // m/s 
        this.throttle = 0           // gas pedal input ? Range [0-1]
        this.susHeight = [0,0,0,0]  //coord cars [suspension, frontLeft, frontRigh, rearLeft, rearRight]

        if(this.data.mGameState != 0)
        {
            switch (this.type) {
                case "sTelemetryData":
                    this.crash = this.data.sCrashState
                    this.gear = this.data.sGearNumGears
                    this.localAcc = this.data.sLocalAcceleration
                    this.speed = this.data.sSpeed
                    this.throttle = this.data.sThrottle
                    this.susHeight = this.data.sRideHeight
                    if(staticData.state == 84 && !staticData.definedGear) staticData.nGear = this.gear, staticData.definedGear = true
                    break;
                case "sGameStateData":
                    if(this.data.mGameState == 84) {
                        staticData.state = this.data.mGameState
                        staticData.definedGear = false
                    }
                default:
                    break;
            }
        }
    }

    isTelemetry() {
        return this.type === "sTelemetryData"
    }
}

module.exports = GameData
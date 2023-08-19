const GameData = require("../../gameData");
const ApiAbstract = require("../apiAbstract");

class RrrApi extends ApiAbstract {

    constructor() {
        super();
    }

    handlePhysics(json){
        const res = {
            data: {},
            type: 'sTelemetryData',
        };
        res.data.sSpeed = json.speedKmh;
        res.data.sThrottle = json.gas;
        res.data.sLocalAcceleration = json.localVelocity;
        res.data.sRideHeight = json.suspensionTravel;
        res.data.sCrashState = 0;
        res.data.sGearNumGears = json.gear;
        res.data.mGameState = 84;

        return res;
    }

    request() {      
        try {
            const memory = new shared_memory("$R3E", 241680, false, false);
            const buf = memory.readBuffer();
            console.log(buf.toJSON());
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = RrrApi
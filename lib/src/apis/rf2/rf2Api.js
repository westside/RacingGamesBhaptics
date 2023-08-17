const GameData = require("../../gameData");
const ApiAbstract = require("../apiAbstract");
const shared_memory = require('@markusjx/shared_memory');

class Rf2Api extends ApiAbstract {

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
            const memory = new shared_memory("$rFactor2SMMP_Telemetry$", 1024, false, false);
            const buf = memory.buffer;
            console.log(buf, data);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Rf2Api
const ACCNodeWrapper = require('acc-node-wrapper')
const StaticData = require("../staticData");
const GameData = require("../gameData");

class AccApi {

    constructor() {
        this.static = new StaticData();
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

    request(effects) {      
        const wrapper = new ACCNodeWrapper();
        /**
         * @name initSharedMemory
         * @comment This is the init function for the ACC Node Wrapper. This inits the Shared Memory.
         * @param M_PHYSICS_UPDATE_INTERVAL
         * @param M_GRAPHICS_UPDATE_INTERVAL
         * @param M_STATIC_UPDATE_INTERVAL
         * @param Logging
         */
        wrapper.initSharedMemory(250, 250, 250, false);

        wrapper.on("M_PHYSICS_RESULT", result => {
            const json = this.handlePhysics(result);
            const gameData = new GameData(json,this.static)
            console.log(gameData);
            effects.forEach((effect) => {
                effect.handle(gameData)
            })
        });

        wrapper.on("M_STATIC_RESULT", result => {
            /*
            const json = this.handleStatic(result);
            const gameData = new GameData(json,this.static)
                
            effects.forEach((effect) => {
                effect.handle(gameData)
            })
            */
        })
    }
}

module.exports = AccApi
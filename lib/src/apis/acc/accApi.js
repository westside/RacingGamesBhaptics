const ACCNodeWrapper = require('acc-node-wrapper')
const ApiAbstract = require('../apiAbstract');

class AccApi extends ApiAbstract {

    constructor() {
        super();
    }

    handlePhysics(json){
        const res = {
            data: {},
            type: 'sTelemetryData',
        };
        res.data.sSpeed = json.speedKmh * 10 / 36; // km/h converted to m/s
        res.data.sThrottle = json.gas;
        res.data.sLocalAcceleration = [10 * json.accG[0], 10 *json.accG[1], -10 * json.accG[2]];
        res.data.sRideHeight = json.suspensionTravel;
        res.data.sCrashState = 0;
        res.data.sGearNumGears = json.gear;
        res.data.mGameState = 84;

        return res;
    }

    request() {      
        //init state
        this.static.state = 84;
        const wrapper = new ACCNodeWrapper();
        /**
         * @name initSharedMemory
         * @comment This is the init function for the ACC Node Wrapper. This inits the Shared Memory.
         * @param M_PHYSICS_UPDATE_INTERVAL
         * @param M_GRAPHICS_UPDATE_INTERVAL
         * @param M_STATIC_UPDATE_INTERVAL
         * @param Logging
         */
        wrapper.initSharedMemory(50, 50, 50, false);

        wrapper.on("M_PHYSICS_RESULT", result => {
            const json = this.handlePhysics(result);
            this.handleEffects(json);
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
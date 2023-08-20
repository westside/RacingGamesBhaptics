const ApiAbstract = require("../apiAbstract");
const shared_memory = require('@markusjx/shared_memory');
const { Notification } = require('electron');

class RrrApi extends ApiAbstract {

    constructor() {
        super();
    }

    handlePhysics(buffer){
        const res = {
            data: {},
            type: 'sTelemetryData',
        };

        const playerData = buffer.subarray(36, 576);
        const gameState = {
            paused: buffer.readInt32LE(16),
            inMenus: buffer.readInt32LE(20),
            inReplay: buffer.readInt32LE(24),
        }
        
        res.data.sSpeed = buffer.readFloatLE(1336);
        res.data.sThrottle = buffer.readFloatLE(1432);
        res.data.sLocalAcceleration = [
            playerData.readDoubleLE(108), 
            playerData.readDoubleLE(116), 
            playerData.readDoubleLE(124)
        ];
        res.data.sRideHeight = [
            playerData.readDoubleLE(444), 
            playerData.readDoubleLE(452),
            playerData.readDoubleLE(460), 
            playerData.readDoubleLE(468)
        ];
        res.data.sCrashState = 0;
        res.data.sGearNumGears = buffer.readInt32LE(1356);
        res.data.mGameState = Object.values(gameState).some(element => element == 1) ? 0 : 84;

        return res;
    }3
    
    readData() {
        const memory = new shared_memory("$R3E", 39320, false, false);
        const buf = memory.readBuffer();
        const json = this.handlePhysics(buf);
        if(json)
        {
            this.handleEffects(json);
        }
    }

    loop() {
        this.readData();
        return new Promise((resolve) => setTimeout(resolve, 200)).then(() => this.loop());
    }

    request() {      
        try {
            this.loop();
        } catch (err) {
            console.log(err);
            new Notification({
                title: "Error",
                body: err.toString()
              }).show();
        }
    }
}

module.exports = RrrApi
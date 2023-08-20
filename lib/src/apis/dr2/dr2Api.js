const ApiAbstract = require("../apiAbstract");
const dgram = require('dgram');
const socket = dgram.createSocket('udp4');

class Dr2Api extends ApiAbstract {

    constructor() {
        super();
    }

    handlePhysics(buffer){
        const res = {
            data: {},
            type: 'sTelemetryData',
        };

        res.data.sSpeed = buffer.readFloatLE(28);
        res.data.sThrottle = buffer.readFloatLE(116);
        res.data.sLocalAcceleration = [buffer.readFloatLE(32), buffer.readFloatLE(36), buffer.readFloatLE(40)];
        res.data.sRideHeight = [buffer.readFloatLE(68), buffer.readFloatLE(72), buffer.readFloatLE(76), buffer.readFloatLE(80)];
        res.data.sCrashState = 0;
        res.data.sGearNumGears = buffer.readFloatLE(132);
        res.data.mGameState = 84;

        return res;
    }

    request() {      
        socket.on('listening', () => {
            let addr = socket.address();
            console.log(`Listening for UDP packets at ${addr.address}:${addr.port}`);
          });
          
        socket.on('error', (err) => {
            console.error(`UDP error: ${err.stack}`);
        });
        
        socket.on('message',(clientMsg) =>{
            const json = this.handlePhysics(clientMsg);
            if(json)
            {
                this.handleEffects(json);
            }            
        });

        try {
            socket.bind(20777);
        } catch (err){
            console.log(err);
        };
    }
}

module.exports = Dr2Api
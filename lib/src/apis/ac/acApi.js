
const ACRemoteTelemetryClient = require('ac-remote-telemetry-client');
const ApiAbstract = require('../apiAbstract');
const {setTimeout} = require('timers/promises');

class AcApi extends ApiAbstract {

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
        res.data.sLocalAcceleration = json.speedMs;
        res.data.sRideHeight = json.carPositionNormalized;
        res.data.sCrashState = 0;
        res.data.sGearNumGears = json.gear;
        res.data.mGameState = 84;

        return res;
    }

    request() {              

        const client = new ACRemoteTelemetryClient('127.0.0.1');

        // Implement desired listeners
        client.on('RT_CAR_INFO', result => {
            const json = this.handlePhysics(result);
            this.handleEffects(json);
        });
        //client.on('RT_LAP', (data) => console.log(data));

        const startServer = () => {
            // Start listening
            client.start();
        };

        const keepSubscribing = async () => { 
            // Send initial handshake
            client.handshake();          
            // Subscribe to desired updates
            client.subscribeUpdate();
            client.subscribeSpot();
            await setTimeout(5000);
            keepSubscribing();
        }

        startServer();
        //caca mais pas le choix
        keepSubscribing();
    }
}

module.exports = AcApi
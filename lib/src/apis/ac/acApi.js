
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
        res.data.sSpeed = json.speedMs;
        res.data.sThrottle = json.gas;
        res.data.sLocalAcceleration = [json.accGHorizontal * 10 , json.accGVertical * 10, json.accGFrontal * -10];
        res.data.sRideHeight = [json.suspensionHeight1 , json.suspensionHeight2, json.suspensionHeight3, json.suspensionHeight4];
        res.data.sCrashState = 0;
        res.data.sGearNumGears = json.gear;
        res.data.mGameState = 84;

        return res;
    }

    request() {              

        //init state
        this.static.state = 84;
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

const ACRemoteTelemetryClient = require('ac-remote-telemetry-client');
const GameData = require("../gameData");

class AcApi {

    request(effects) {              

        const client = new ACRemoteTelemetryClient('127.0.0.1');

        // Implement desired listeners
        client.on('HANDSHAKER_RESPONSE', (data) => console.log(data));
        client.on('RT_CAR_INFO', (data) => console.log(data));
        client.on('RT_LAP', (data) => console.log(data));

        // Start listening
        client.start();

        // Send initial handshake
        client.handshake();

        // Subscribe to desired updates
        client.subscribeUpdate();
        client.subscribeSpot();

        // Stop listening
        client.stop();
    }
}

module.exports = AcApi
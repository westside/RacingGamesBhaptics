
const dgram = require('dgram');
const path = require('path')
const socket = dgram.createSocket('udp4');
const os = require('os');
const SelectedGame = require('../../selectedGame');

const UdpParser = require('./udp-parser');
const ApiAbstract = require('../apiAbstract');
const { timeStamp } = require('console');

const parser = new UdpParser(path.join(__dirname, '../../../definitions/SMS_UDP_Definitions.hpp'));

class PcarsApi extends ApiAbstract {

    constructor() {
        super();
    }

    request() {      
        socket.on('listening', () => {
            let addr = socket.address();
            console.log(`Listening for UDP packets at ${addr.address}:${addr.port}`);
          });
          
        socket.on('error', (err) => {
            console.error(`UDP error: ${err.stack}`);
        });
        
        socket.on('message',(msg,info) =>{
            let json = parser.pushBuffer(msg) 
            if(json)
            {
                this.handleEffects(json);
            }
        });

       try {
            socket.bind(5606);
       } catch(err) {
            console.log(err);
       }
    }
}

module.exports = PcarsApi
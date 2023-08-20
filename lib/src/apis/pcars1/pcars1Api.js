
const dgram = require('dgram');
const path = require('path')
const socket = dgram.createSocket('udp4');
const os = require('os');
const {sneak} = require("./packet");

const ApiAbstract = require('../apiAbstract');

class Pcars1Api extends ApiAbstract {

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
        
        socket.on('message',(clientMsg) =>{
            const instance = this;
            sneak(clientMsg, function(packet) {
                if(packet.header.sPacketType === 0) {
                    instance.handleEffects(packet);
                }
              });
        });

        try {
            socket.bind(5606);
        } catch (err){
            console.log(err);
        }
    }
}

module.exports = Pcars1Api
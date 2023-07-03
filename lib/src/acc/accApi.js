
const dgram = require('dgram');
const path = require('path')
const socket = dgram.createSocket('udp4');
const os = require('os');

const GameData = require("../gameData");

class AccApi {

    request() {      
        socket.on('listening', () => {
            let addr = socket.address();
            console.log(`Listening for UDP packets at ${addr.address}:${addr.port}`);
          });
          
        socket.on('error', (err) => {
            console.error(`UDP error: ${err.stack}`);
        });
        
        socket.on('message',(msg,info) =>{

            console.log(msg, info);

            /*
            let json = parser.pushBuffer(msg) 

            const gameData = new GameData(json,this.static)
            
            this.effects.forEach((effect) => {
                effect.handle(gameData)
            })
            */
        });

        try {
            socket.bind(9000);
        } catch (err){
            console.log(err);
        }
    }
}

module.exports = AccApi
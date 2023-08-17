
const dgram = require('dgram');
const path = require('path')
const socket = dgram.createSocket('udp4');
const os = require('os');
const {sneak} = require("./packet");

const GameData = require("../../gameData");
const ApiAbstract = require('../apiAbstract');

class Pcars1Api extends ApiAbstract {

    constructor() {
        super();
    }

    getLocalIp() {       

        //get local IP
        const networkInterfaces = os.networkInterfaces();
        const filtered = Object.keys(networkInterfaces).map((key) => {
            if(key === 'Ethernet' || key === "Wireless")
            {
                const interfaces = networkInterfaces[key].map(interf => {
                    if(interf.family === "IPv4")
                    {
                        return interf.address;
                    }
                });
                return interfaces.filter(val => val != undefined);
            }
        }).filter(val => val);

        return filtered.flat();
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
                    const gameData = new GameData(packet, instance.static)
                    //console.log(gameData);
                    instance.effects.forEach((effect) => {
                        effect.handle(gameData)
                    })
                }
              });
        });

        const res = this.getLocalIp();
        let connected = false;
        res.forEach(ip => {
            try {
                if(!connected) {
                    socket.bind(5606, ip);
                    connected = true;
                }
            } catch (err){
                console.log(err);
            }
        });
    }
}

module.exports = Pcars1Api
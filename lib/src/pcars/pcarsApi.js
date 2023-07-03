
const dgram = require('dgram');
const path = require('path')
const socket = dgram.createSocket('udp4');
const os = require('os');
const StaticData = require("../staticData");

const GameData = require("../gameData");
const UdpParser = require('./udp-parser');

const parser = new UdpParser(path.join(__dirname, '../../definitions/SMS_UDP_Definitions.hpp'));

class PcarsApi {

    constructor() {
        this.static = new StaticData();
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

            const gameData = new GameData(json,this.static)
            
            this.effects.forEach((effect) => {
                effect.handle(gameData)
            })
        });

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

        const res = filtered.flat();

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

module.exports = PcarsApi
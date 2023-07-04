
const dgram = require('dgram');
const path = require('path')
const socket = dgram.createSocket('udp4');
const os = require('os');
const StaticData = require("../staticData");
const SelectedGame = require('../selectedGame');

const GameData = require("../gameData");
const UdpParser = require('./udp-parser');

const parser = new UdpParser(path.join(__dirname, '../../definitions/SMS_UDP_Definitions.hpp'));

class PcarsApi {

    constructor() {
        this.static = new StaticData();
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

    request(effects) {      
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
                const gameData = new GameData(json,this.static)
                
                effects.forEach((effect) => {
                    effect.handle(gameData)
                })
            }
        });

        
        //depending on which project cars game
        let res = null;
        if(SelectedGame.getGameId() === 'pc1')
        {
            res = ['0.0.0.0'];
        }

        if (SelectedGame.getGameId() === 'pc2')
        {
            res = this.getLocalIp();
        }

        if (SelectedGame.getGameId() === 'pc3')
        {
            res = this.getLocalIp();
        }

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
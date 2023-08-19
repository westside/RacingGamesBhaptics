
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
        
        socket.on('message',(msg,info) =>{
            let json = parser.pushBuffer(msg) 
            if(json)
            {
                this.handleEffects(json);
            }
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

module.exports = PcarsApi
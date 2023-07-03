
const dgram = require('dgram');
const path = require('path')
const socket = dgram.createSocket('udp4');
const os = require('os');

const GameData = require("../gameData");

class AccApi {

    request() {      
        const ACCNodeWrapper = require('acc-node-wrapper')
        const wrapper = new ACCNodeWrapper()

        /**
         * @name initSharedMemory
         * @comment This is the init function for the ACC Node Wrapper. This inits the Shared Memory.
         * @param M_PHYSICS_UPDATE_INTERVAL
         * @param M_GRAPHICS_UPDATE_INTERVAL
         * @param M_STATIC_UPDATE_INTERVAL
         * @param Logging
         */
        wrapper.initSharedMemory(250, 250, 250, true);

        wrapper.on("M_PHYSICS_RESULT", result => {
            console.log("M_PHYSICS_RESULT", result)
        });

        wrapper.on("M_GRAPHICS_RESULT", result => {
            console.log("M_GRAPHICS_RESULT", result)
        });

        wrapper.on("M_STATIC_RESULT", result => {
            console.log("M_STATIC_RESULT", result)
        })
    }
}

module.exports = AccApi
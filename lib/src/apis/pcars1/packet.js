"use strict";

const numeral = require("numeral");
const {unsignedClamp, signedClamp} = require("./raceMath");

let Packet = {
  "0": function(peek, callback) {
    let packet = {
      header: peek.header,
      type: (peek.header.sPacketType === 0)? "sTelemetryData" : "",
      data: {
        //cars 
        sSpeed: peek.payload.readFloatLE(120),
        sGearNumGears: peek.payload.readInt8(128),
        sCrashState: peek.payload.readInt8(131),
        sLocalAcceleration: [peek.payload.readFloatLE(184), peek.payload.readFloatLE(188), peek.payload.readFloatLE(192)],
        sThrottle: peek.payload.readInt8(113),
        sRideHeight: [peek.payload.readFloatLE(392), peek.payload.readFloatLE(396), peek.payload.readFloatLE(400), peek.payload.readFloatLE(404)],
        mGameState: peek.payload.readInt8(3),
      }
    };
    callback(packet);
  },
  "1": function(peek, callback) {
    callback({ header: peek.header, data: null });
  },
  "2": function(peek, callback) {
    callback({ header: peek.header, data: null });
  }
};

function sneak (content, callback) {
  let peek = {
    header: {
      sBuildVersion: content.readUInt16LE(0),
      sequence: content.readUInt8(2) & 0xFC >> 2,
      sPacketType: content.readUInt8(2) & 0x3
    },
    payload: content
  };

  Packet[peek.header.sPacketType](peek, callback);
}

module.exports = {
  sneak,
};

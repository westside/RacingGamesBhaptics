const Crash = require("../effects/crash");
const Engine = require("../effects/engine");
const Gear = require("../effects/gear");
const GearWheel = require("../effects/gearwheel");
const GForce = require("../effects/gForce");
const ConfigLoader = require('../configLoader');
const StaticData = require("../staticData");

class ApiAbstract {

    constructor() {
        this.config = new ConfigLoader(__dirname);
        this.effects = []
        this.static = new StaticData();   
    }

    initializeEffects(tactPlay) {
        this.effects = []

        const effectClass = {
            crash: Crash,
            engine: Engine,
            gear: Gear,
            gearwheel: GearWheel,
            gforce: GForce
        }
        
        for (const [name, effect] of Object.entries(this.config.load())) {
            effect.enable && this.effects.push(new (effectClass[name])(tactPlay, {
                intensity: effect.intensity,
                duration: effect.duration
            }))
        }
    }
}

module.exports = ApiAbstract;
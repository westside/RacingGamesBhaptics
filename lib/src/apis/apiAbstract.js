const Crash = require("../effects/crash");
const Engine = require("../effects/engine");
const Gear = require("../effects/gear");
const GearWheel = require("../effects/gearwheel");
const GForce = require("../effects/gForce");
const ConfigLoader = require('../configLoader');
const StaticData = require("../staticData");
const GameData = require("../gameData");

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

    handleEffects(json) {
        console.log(json);
        const gameData = new GameData(json,this.static)
        this.effects.forEach((effect) => {
            effect.handle(gameData)
        })
    }
}

module.exports = ApiAbstract;
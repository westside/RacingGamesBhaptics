const os = require('os');

const StaticData = require("./staticData");

const Crash = require("./effects/crash");
const Engine = require("./effects/engine");
const Gear = require("./effects/gear");
const GearWheel = require("./effects/gearwheel");
const GForce = require("./effects/gForce");
const SelectedGame = require('./selectedGame');
const ApiFactory = require('./apiFactory');

class Api {
    constructor(tactPlay, config) {
        this.tactPlay = tactPlay
        this.config = config
        this.gearLast = 112
        this.crashTotal = 0
        this.state = true
        this.effects = []
        this.static = new StaticData()
        this.initializeEffects()
    }

    initializeEffects() {
        this.effects = []

        const effectClass = {
            crash: Crash,
            engine: Engine,
            gear: Gear,
            gearwheel: GearWheel,
            gforce: GForce
        }
        
        for (const [name, effect] of Object.entries(this.config.effects)) {
            effect.enable && this.effects.push(new (effectClass[name])(this.tactPlay, {
                intensity: effect.intensity,
                duration: effect.duration
            }))
        }
    }

    setEffectsSetting(settings) {
        this.config.effects = settings

        this.initializeEffects()
    }

    setEffectSetting(name, options) {
        this.config.effects[name] = {
            ...this.config.effects[name],
            ...options
        }

        this.initializeEffects()
    }

    request() {      
        
        // is a game selected ?
        if(SelectedGame.getGameId() == '')
        {
            return;
        }
        
        // is everything working for that game config ?

        //what kind of api do I need for that game ?
        const api = ApiFactory.getApiByGame();
       

        api?.request();
        
    }
}

module.exports = Api
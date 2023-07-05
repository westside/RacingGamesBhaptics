
class TactPlayer {
    constructor(tact, api, sendEvent, listenEvent) {
        this.tact = tact
        this.sendEvent = sendEvent
        this.listenEvent = listenEvent
        this.hapticsConnectionState = false
        this.logs = []
        this.api = api
        this.initializeListeners()
    }

    initializeListeners() {
        this.listenEvent('play-effect', this.playEffect.bind(this))
        this.listenEvent('log', this.addLog.bind(this))
        this.listenEvent('get-data', this.getData.bind(this))
    }

    launch() {
        this.tact
            .onFileLoaded((file) => {
                this.sendEvent('tact-device-fileLoaded', file)
            })
            .onConnecting(() => {
                this.sendEvent('tact-device-connecting', {})
            })
            .onConnected((name) => {
                //sinon start 4-5 fois la boucle et send l'event plusieurs fois
                if(this.hapticsConnectionState !== true) {
                    this.hapticsConnectionState = true
                    this.sendEvent('tact-device-connected', {
                        name:name
                    })
                }
            })
            .onDisconnected((message) => {
                this.hapticsConnectionState = false
                this.sendEvent('tact-device-disconnected', message.message) }
            )
            .connect()
    }    
    
    playEffect(arg) {
        
        const names  = arg.effect
        this.tact.playEffect(names, this.api.config.effects[names])
    }
    
    addLog(arg) {
        this.logs.push(arg)
    }


    getData() {
        this.sendEvent('data-updated', {
            statusHaptic: this.hapticsConnectionState,
            logs: this.logs,
        })
    }
}

module.exports = TactPlayer
const { Handler, EventListener, FileUtils } = require("../../");

module.exports = class Event extends Handler {
    constructor(client) {
        super('Event', client)
    }

    build() {
        return this.handleEvents()
    }

    handleEvents() {
        return FileUtils.requireDirectory(
            'src/app/events',
            this.validateEvent.bind(this)
        ).then(() => true)
    }

    validateEvent({ required: NewEvent }) {
        if (NewEvent.prototype instanceof EventListener) {
            const listener = new NewEvent(this.client)
            listener.events.forEach(event => {
                const hasFunction = listener.realEvents[event]
                if (hasFunction) {
                    this.client.on(event, (...args) =>
                        listener[`on${event.capitalize()}`](...args)
                    )
                    console.log('[Events] Loaded events with successfully.')
                }
            })
        } else {
            console.log('[Events] Not a Event!')
        }
        return true
    }
}
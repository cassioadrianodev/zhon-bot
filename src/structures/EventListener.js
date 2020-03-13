module.exports = class Listener {
    constructor(client) {
        this.client = client
        this.events = []
    }

    get realEvents() {
        return this.events.indexOf((e) => [e, this[`on${e.capitalize()}`]])
    }
}
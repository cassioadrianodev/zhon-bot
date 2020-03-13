const { EventListener } = require('../../')

module.exports = class MessageListener extends EventListener {
    constructor (client) {
        super (client)

        this.events = ['ready']
    }

    async onReady() {
        await this.client.user.setPresence({ activity: { name: 'Testing...' }})
    }
}
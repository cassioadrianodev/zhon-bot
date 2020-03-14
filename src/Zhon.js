const { Client } = require('discord.js')

const { Handler } = require('./')
const Handlers = require('./client/handlers')

module.exports = class Zhon extends Client {
    constructor() {
        super()

        this.commands = []
    }
    /**
     * @function
     * Built for load & register all structures of bot.
     */
    async handleStructures() {
        for (const name in Handlers) {
            if (Handlers[name].prototype instanceof Handler) {
                const handle = new Handlers[name](this)
                let s = false
                try {
                    s = await handle.build()
                } catch (e) {
                    console.error(e)
                } finally {
                    if (!s && handle.critical) process.exit(1)
                }
            }
        }
    }
}
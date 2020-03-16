const { Client } = require('discord.js')

const { Handler, Command } = require('./')
const Handlers = require('./client/handlers')

module.exports = class Zhon extends Client {
    constructor() {
        super()
    }

    /**
     * @function
     * Built for load commands.
     * @param {Command} command Command
     * @param {CommandContext} context Command Context
     * @param {String<Array>} args Arguments
     */
    runCommand(command, context, args) {
        return command._run(
            context,
            args
        )
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
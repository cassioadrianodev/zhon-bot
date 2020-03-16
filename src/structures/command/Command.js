const CommandUtils = require('./CommandUtils')
const CommandContext = require("./CommandContext")

const ZhonEmbed = require('../ZhonEmbed')

module.exports = class Command {
    constructor(options = {}, client) {
        this.client = client

        this.name = options.name || new Error('Name is required.')
        this.aliases = options.aliases || []
        this.category = options.category || 'general'

        this.description = options.description || ''
        this.usage = options.usage || ''

        this.utils = options.utils // Run CommandUtils
    }

    async _run(context, args) {
        try {
            this.buildUtils(context, args)
        } catch (e) {
            return this.error(context, e)
        }

        try {
            const res = await this.run(context, args)
            return res
        } catch (e) {
            return this.error(context, e)
        }
    }

    async run() { }

    /**
     * @function
     * Build uses in Command options.
     * @param {CommandContext} context Command Context
     * @param {String<Array>} args Arguments 
     */
    buildUtils (context, args) {
        return this.utils ? CommandUtils.build(context, this.utils, args) : true
    }

    error({ channel }, error) {
        if (error instanceof Error) {
            const embed = new ZhonEmbed()
            embed.setDescription(error.message)
            embed.setColor(process.env.ERROR_COLOR)
            return channel.send(embed)
        }
        return console.error(error)
    }
}
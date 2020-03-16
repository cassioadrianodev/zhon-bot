const { ZhonEmbed } = require("../..")

module.exports = class Command {
    constructor(options = {}, client) {
        this.client = client

        this.name = options.name || new Error('Name is required.')
        this.aliases = options.aliases || []
        this.category = options.category || 'general'

        this.description = options.description || ''
        this.usage = options.usage || ''

        this.devOnly = options.devOnly || false
        this.nsfwOnly = options.nsfwOnly || false
    }

    async _run(context, args) {
        try {
            const res = await this.run(context, args)
            return res
        } catch (e) {
            return this.error(context, e)
        }
    }

    async run() { }

    error({ channel, author }, error) {
        if (error instanceof Error) {
            const embed = new ZhonEmbed(author)
            embed.setDescription(error.message)
            embed.setColor(process.env.ERROR_COLOR)
            return channel.send(embed)
        }
        return console.error(error)
    }
}
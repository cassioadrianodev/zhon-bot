/**
 * Command Context created for best use
 */
module.exports = class CommandContext {
    /**
     * @constructor
     * @param {Object} options Context Options
     */
    constructor (options = {}) {
        // Required Importations
        this.client = options.client

        this.command = options.command
        this.prefix = options.prefix
        this.message = options.message

        // Extensions of Importations
        this.author = options.message.author
        this.member = options.message.member
        this.guild = options.message.guild
        this.channel = options.message.channel
        this.voiceChannel = options.message.member.voiceChannel
        this.content = options.message.content
    }
}
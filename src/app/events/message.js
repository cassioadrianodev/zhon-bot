const { CommandContext } = require("../../structures/command")

module.exports = async function onMessage(message) {
    if (message.author.bot && message.channel.type === 'dm') return
    if (!message.guild) throw new Error('Guild not Find.')

    const guildID = message.guild && message.guild.id
    const guildDocument = await this.database.guilds.findOne(guildID)

    const botMention = this.user ? this.user.toString() : new Error('User not Find.')
    const prefix = guildDocument && guildDocument.prefix || process.env.prefix
    
    const sw = (...s) => s.some(st => message.content.startsWith(st))
    const usedPrefix = sw(botMention, `<@!${this.user.id}>`) ? `${botMention} ` : sw(prefix) ? prefix : null

    if (usedPrefix) {
        const fullCmd = message.content.substring(usedPrefix.length).split(/[ \t]+/).filter(a => a)
        const args = fullCmd.slice(1)
        if (!fullCmd.length) return

        const cmd = fullCmd[0].toLowerCase().trim()
        const command = this.commands
            .find(c =>
                c.name === cmd
                ||
                (c.aliases && c.aliases.includes(cmd)))

        if (command) {

            if (message.author && !this.database.users.findOne(message.author.id)) await this.database.users.update(message.author.id, { $set: { _id: message.author.id }})

            const context = new CommandContext({
                client: this,
                message: message,
                command: command,
                prefix: prefix
            })

            console.log(`[Commands] Command "${command.name}" was used by "${message.author.tag}" from "${message.guild.name}" (${message.guild.id})`)
            this.runCommand(command, context, args)
        }
    }
}
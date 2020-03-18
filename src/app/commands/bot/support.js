const { Command, ZhonEmbed } = require('../../../')

module.exports = class Support extends Command {
    constructor (client) {
        super ({
            name: 'support',
            aliases: ['discord', 'suporte'],
            category: 'Bot',
            description: 'Use para entrar no meu servidor de suporte.'
        }, client)
    }

    async run ({ channel, author }) {
        channel.send(new ZhonEmbed(author)
         .setDescription(`🔗 Adentre no meu servidor de [**suporte**](${process.env.DISCORD_INVITE}).`))
    }
}
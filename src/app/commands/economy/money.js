const { Command, ZhonEmbed } = require('../../../')

module.exports = class Money extends Command {
    constructor (client) {
        super ({
            name: 'money',
            aliases: ['moedas', 'dinheiro', 'my'],
            category: 'Economia',
            description: 'Ver o seu dinheiro ou do outro usuário.',
            usage: '{{p}}money <usuário>'
        }, client)
    }

    async run ({ message, channel, guild, author }, args) {
        const embed = new ZhonEmbed(author)
        const member = guild.members.cache.find(m => m.user.username.toLowerCase().includes(args.join(' ').toLowerCase()) || m.displayName.toLowerCase().includes(args.join(' ').toLowerCase()))
        const money = Number(await this.client.controllers.userController.balance(member.id)).toLocaleString()

        if (author.id === member.id) {
            embed.setDescription(`🌵 Você possui **${money} moedas** atualmente.`)
        } else {
            embed.setDescription(`🐾 O usuário \`${member.user.tag}\` possui **${money} moedas** atualmente.`)
        }
         return channel.send(embed)
    }
}
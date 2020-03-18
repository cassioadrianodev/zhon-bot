const { Command, ZhonEmbed } = require("../../..");

module.exports = class Team extends Command {
    constructor (client) {
        super ({
            name: 'team',
            aliases: ['tm'],
            category: 'Bot',
            description: 'Ver membros da equipe do Zhon.'
        }, client)
    }

    async run ({ channel, author }) {
        const embed = new ZhonEmbed(author)

        const botGuild = this.client.guilds.cache.get(process.env.BOT_GUILD)
        const devRole = botGuild.roles.cache.get(process.env.DEV_ROLE)

        const members = (role) => {
            return role.members
               .map(member => member.user.tag)
               .join(', ')
        }

        const membersSize = (role) => {
            return role.members.size
        }

        embed.setAuthor('Time do Zhon', this.client.user.displayAvatarURL())
        embed.setDescription(`Hmm. Você está com aquela vontade de adentrar na **equipe** do ${this.client.user}? Entre no meu servidor de [**suporte**](${process.env.DISCORD_INVITE}) para resolvermos isto.`)
        embed.addField(`- __Desenvolvedores__ [**${membersSize(devRole)}**]`, (members(devRole) ? `\`${members(devRole)}\`` : '`Nenhum`'), false)

        return channel.send(embed)
    }
}
const { Command, ZhonEmbed } = require("../../..");

module.exports = class Commands extends Command {
    constructor(client) {
        super({
            name: 'commands',
            aliases: ['comandos', 'cmds'],
            category: 'Bot',
            description: 'Mostra a lista de comandos atuais do Zhon.'
        }, client)
    }

    async run({ channel, prefix, author }) {
        const embed = new ZhonEmbed(author)

        const checkCommands = this.client.commands.filter(c => !c.hidden)

        const categories = checkCommands.map(c => c.category).filter((v, i, a) => a.indexOf(v) === i)
        categories
            .sort((a, b) => a.localeCompare(b))
            .forEach(category => {
                const commands = checkCommands
                    .filter(c => c.category === category)
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(c => c.name).join('`, `')

                const Size = checkCommands
                    .filter(c => c.category === category).size

                embed.setAuthor(`Comandos disponíveis`, this.client.user.displayAvatarURL())
                embed.setDescription(`**Prefixo**: \`${prefix}\` (${this.client.user} também pode ser usado como prefixo.)
                **Use** \`${prefix}help <comando>\` **para saber informações de um comando especifico**.`)
                embed.setThumbnail(author.displayAvatarURL())
                embed.addField(`__${category}__ [**${Size}**]`, `\`${commands}\``, false)
            })
        return channel.send(embed)
    }
}
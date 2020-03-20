const { Command, ZhonEmbed } = require("../../..");

const moment = require('moment')
moment.locale('pt-BR')

module.exports = class Help extends Command {
    constructor (client) {
        super ({
            name: 'help',
            aliases: ['h', 'ajuda'],
            category: 'Bot',
            description: 'Ver informações sobre o robô ou de um comando em especifico.',
            usage: '{{p}}help <comando>'
        }, client)
    }

    async run({ channel, prefix, author }, args) {
        const embed = new ZhonEmbed(author)
        const command = this.client.commands.find(cmd => cmd.name === args[0])

        if (!args[0]) {
            embed.setThumbnail(author.displayAvatarURL())
            embed.setAuthor(`Ajuda do Zhon.`, this.client.user.displayAvatarURL())

            embed.setDescription(`[**Convite**](${process.env.BOT_INVITE})
            [**Suporte**](${process.env.DISCORD_INVITE})
            [**Organização**](${process.env.GITHUB_ORGANIZATION})
            
            **Sobre o Zhon**
             Eu sou o ${this.client.user.toString()}, fui criado na data dê ${moment(this.client.user.createdAt).format('L LTS')}. Trabalho arduamente para **${this.client.guilds.cache.size} servidores** com **${this.client.users.cache.size} usuários**. Você sabia que eu sou um **projeto** de **Código Aberto**? Visite o meu **repositório** clicando [**aqui**](${process.env.GITHUB_REPOSITORY}).
             
             Caso for possível você poderia dar uma **estrela** ⭐ em meu [**repositório**](${process.env.GITHUB_REPOSITORY})? Obrigado desde já.

            **Outros**
            Adquira mais informações sobre os comandos usando \`${prefix}commands\`.
            
            Você também pode ver as informações de um comando especifico usando \`${prefix}${this.name} <comando>\`.
            
            Em breve será feito um sistema de doações, então você deve ficar ativo nas novas noticias!`)
        } else if (command) {
            const description = [
                command.description,
                command.usage ? `\n**Modo de uso**: \`${command.usage.replace('{{p}}', prefix)}\`` : ''
            ]

            if (command.aliases && command.aliases.length > 0) description.push(`**Abreviações**: \`${command.aliases.join('`, `')}\``)
            if (command.subcommands && command.subcommands.length > 0) description.push(`**Sub-comandos**: \`${command.subcommands.join('`, `')}\``)
            if (command.hidden) description.push(`**Oculto**: \`Sim\``)

            embed.setTitle(command.constructor.name)
            embed.setDescription(description.join('\n'))
        } else {
            embed.setDescription(`❓ O comando especificado não foi encontrado.`)
        }
         return channel.send(embed)
    }
}
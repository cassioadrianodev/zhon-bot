const { Command } = require("../../structures/command");
const { ZhonEmbed } = require("../..");

module.exports = class test extends Command {
    constructor (client) {
        super ({
            name: 'test',
            aliases: ['tst'],
            category: 'Test'
        }, client)
    }

    async run ({ channel, author }, args) {
        const embed = new ZhonEmbed(author)

        if (!args[0]) embed.setDescription(`n digitou nada`)
        else embed.setDescription(args.join(' '))

        return channel.send(embed)
    }
}
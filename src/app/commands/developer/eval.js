const { Command, ZhonEmbed } = require("../../..");
const util = require('util')

module.exports = class Eval extends Command {
    constructor(client) {
        super({
            name: 'eval',
            aliases: ['ex', 'execute'],
            category: 'developer',
            hidden: true,
            utils: { devOnly: true }
        }, client)
    }

    async run({ channel, message }, args) {
        try {
            if (!args[0]) return channel.send(new ZhonEmbed().setColor(process.env.ERROR_COLOR).setDescription(('❗ Você não escreveu nada, assim não é possível retornar um resultado.')))
            const evaled = await eval(args.join(' ').replace(/(^`{3}(\w+)?|`{3}$)/g, ''))
            const cleanEvaled = this.clean(util.inspect(evaled, { depth: 0 }))
            await channel.send(cleanEvaled, { code: 'js' })
        } catch (err) {
            channel.send('`ERROR` ```js\n' + this.clean(err) + '\n```')
        }
    }

    clean(text) {
        const blankSpace = String.fromCharCode(8203)
        return typeof text === 'string' ? text.replace(/`/g, '`' + blankSpace).replace(/@/g, '@' + blankSpace) : text
    }
}
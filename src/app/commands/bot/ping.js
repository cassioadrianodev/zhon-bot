const { Command } = require("../../..");

module.exports = class Ping extends Command {
    constructor(client) {
        super({
            name: 'ping',
            aliases: ['pong', 'peng', 'pog', 'latencia'],
            category: 'Bot',
            description: 'Ver a latência da API e do Servidor.'
        }, client)
    }

    async run({ message, client }) {
        const msg = await message.channel.send('🌀 **Carregando informações...**')

        msg.edit(`🧪 **API**: \`${Math.ceil(client.ws.ping)}ms\`.
🏓 **Latência**: \`${msg.createdTimestamp - message.createdTimestamp}ms\`.`)
    }
}
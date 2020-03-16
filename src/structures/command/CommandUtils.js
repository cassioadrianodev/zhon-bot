module.exports = class CommandUtils {
    static parseOptions(options = {}) {
        return {
            devOnly: !!options.devOnly,
            guildOnly: !!options.guildOnly,
            databaseOnly: !!options.databaseOnly,
            nsfwOnly: !!options.nsfwOnly
        }
    }

    static build({ channel, client, author, guild }, opts = {}) {
        const options = this.parseOptions(opts)

        /**
         * @function
         * Return if the user are developer or not. (Boolean)
         */
        function isDeveloper(client, user) {
            const botGuild = client.guilds.cache.get(process.env.BOT_GUILD)
            const devRole = botGuild.roles.cache.get(process.env.DEV_ROLE)
            const isDeveloper = devRole.members.has(user.id)
            return isDeveloper
        }

        if (options.devOnly && !isDeveloper(client, author)) {
            throw new Error('❓ Somente desenvolvedores possuem acesso ao comando.')
        }

        if (options.guildOnly && !guild) {
            throw new Error('❌ O comando só pode ser utilizado em servidores.')
        }

        if (options.databaseOnly && !client.database) {
            throw new Error('❓ Conexão com o banco dados não estabelecida.')
        }

        if (options.nsfwOnly && !channel.nsfw) {
            throw new Error('❌ O comando só pode ser utilizado em canais **NSFW**.')
        }
    }
}
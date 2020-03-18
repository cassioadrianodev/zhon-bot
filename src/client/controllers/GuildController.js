const { Controller } = require("../..");

module.exports = class GuildController extends Controller {
    constructor (client) {
        super ({
            name: 'guildController'
        }, client)
    }

    canLoad () {
        return !!this.client.database
      }

    get _guilds () {
        return this.client.database.guilds
    }

    /**
     * @function
     * @param {Guild} _guild Guild Id
     * @param {String} newPrefix New Prefix
     */
    async updatePrefix (_guild, newPrefix) {
        const { prefix } = await this._guilds.findOne(_guild)
        if (prefix == newPrefix) throw new Error('⁉ Prefixos iguais, tente adicionar outro.')

        return await this._guilds.update(_guild, {
            $set: {
                prefix: newPrefix
            }
        })
    }
}
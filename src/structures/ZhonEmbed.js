const { MessageEmbed } = require("discord.js");

module.exports = class ZhonEmbed extends MessageEmbed {
    constructor (u, d = {}) {
        super (d)

        if (d.color) this.setColor(process.env.EMBED_COLOR)
        if (u) this.setFooter(u.tag, u.displayAvatarURL()).setTimestamp()
    }
}
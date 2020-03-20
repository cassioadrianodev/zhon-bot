const { Command, ZhonEmbed } = require("../../../");

module.exports = class Play extends Command {
    constructor(client) {
        super(
            {
                name: "play",
                aliases: ["p", "tocar"],
                category: "Música",
                description:
                    "Escute suas músicas preferidas com uma boa qualidade.",
                usage: "{{p}}play <nome/url da música>"
            },
            client
        );
    }

    async run({ channel, guild, member }, args) {
        if (!args.join(" ")) return channel.send(`diz o nome da música`);

        if (this.client.calls.size > 0) {
            this.client.calls
                .get(guild.id)
                .play(args.join(" "))
                .then(info => {
                    channel.send(`Foi adicionado a fila **${info.title}**`)
                });
        } else {
            let player = await this.client.musicManager.join(
                member.voice.channel
            );
            player.on("playingNow", track => {
                channel.send(`Tocando agora **${track.info.title}**`)
                this.client.calls.get(guild.id).playingNow = track;
            });
            player.play(args.join(" "));
            this.client.calls.set(guild.id, player);
        }
    }
};

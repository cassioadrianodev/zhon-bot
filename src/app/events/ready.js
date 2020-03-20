const { LavalinkManager } = require("../..");
const PRESENCE_INTERVAL = 10000; // 10 seconds

module.exports = async function onReady() {
    const presences = [
        {
            name: `@${this.user.username} help - ${this.guilds.cache.size} guilds`,
            type: "WATCHING"
        },
        {
            name: `@${this.user.username} help`,
            url: "https://twitch.tv/cassiolopes1"
        },
        {
            name: `@${this.user.username} help - ${this.users.cache.size} users`,
            type: "WATCHING"
        }
    ];

    /*
    setInterval(() => {
        const presence =
            presences[Math.floor(Math.random() * presences.length)];
        this.user.setPresence({
            activity: {
                presence
            }
        });
    }, PRESENCE_INTERVAL); */

    // Lavalink connection

    if (process.env.LAVALINK_NODES) {
        try {
            let nodes = JSON.parse(process.env.LAVALINK_NODES)
            if (!Array.isArray(nodes)) throw new Error("PARSE_ERROR");
            this.musicManager = new LavalinkManager(this)
            console.log("[Music] Lavalink connection established!");
        } catch (e) {
            console.log(
                "[Music] Failed to establish Lavalink connection - Failed to parse LAVALINK_NODES environment variable."
            );
            console.error(e);
        }
    }
};

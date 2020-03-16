const { Handler } = require("../../");
const { lstatSync, readdirSync } = require('fs');
const { Collection } = require("discord.js");

module.exports = class Command extends Handler {
    constructor(client) {
        super('Command', client)

        this.commands = new Collection()
    }

    build() {
        this.client.commands = this.commands
        this.handleCommands()
    }

    handleCommands(dir = 'C:/Users/PATRICIA/Desktop/Jobs/Github/zhon-bot/src/app/commands') {
        readdirSync(dir)
            .forEach(file => {
                const filePath = `${dir}/${file}`

                try {
                    if (file.endsWith('.js')) {
                        const Command = require(filePath)
                        const commandName = file.replace(/.js/g, '').toLowerCase()
                        const command = new Command(this, commandName)

                        return this.commands.set(commandName, command)
                    } else if (lstatSync(filePath).isDirectory()) {
                        return this.handleCommands(filePath)
                    }
                } catch (e) {
                    console.error(e)
                }
            })
    }
}
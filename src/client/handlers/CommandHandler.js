const { Handler } = require("../../");
const { lstatSync, readdirSync } = require('fs');
const { Collection } = require("discord.js");
const { fail } = require("assert");

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
        let success = 0
        let failed = 0
        readdirSync(dir)
            .forEach(file => {
                const filePath = `${dir}/${file}`

                try {
                    success++
                    if (file.endsWith('.js')) {
                        const Command = require(filePath)
                        const commandName = file.replace(/.js/g, '').toLowerCase()
                        const command = new Command(this.client, commandName)

                        return this.commands.set(commandName, command)
                    } else if (lstatSync(filePath).isDirectory()) {
                        if (failed > success) console.log(`[Commands] ${failed} commands were not loaded successfully. And ${success} were loaded successfully.`)
                        else console.log(`[Commands] ${success} commands were loaded successfully. And ${failed} were not loaded successfully.`)
                        this.handleCommands(filePath)
                    }
                } catch (e) {
                    failed++
                    console.error(e)
                }
            })
    }
}
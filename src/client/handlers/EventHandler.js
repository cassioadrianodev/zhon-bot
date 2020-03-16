const { Handler } = require("../../");
const { lstatSync, readdirSync } = require('fs')

module.exports = class Event extends Handler {
    constructor(client) {
        super('Event', client)
    }

    build() {
        return this.handleEvents()
    }

    handleEvents(dir = 'C:/Users/PATRICIA/Desktop/Jobs/Github/zhon-bot/src/app/events') {
        readdirSync(dir)
            .forEach(file => {
                const filePath = `${dir}/${file}`

                try {
                    if (file.endsWith('.js')) {
                        const Listener = require(filePath)
                        const listenerName = file.replace(/.js/g, '')

                        this.client.on(listenerName, Listener)
                    } else if (lstatSync(filePath).isDirectory()) {
                        return this.handleEvents(filePath)
                    }
                } catch (e) {
                    console.error(e)
                }
            })
    }
}
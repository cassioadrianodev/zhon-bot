const { Handler } = require("../../");
const { lstatSync, readdirSync } = require('fs')

module.exports = class Event extends Handler {
    constructor(client) {
        super('Event', client)
    }

    build() {
        return this.handleEvents()
    }

    handleEvents(dir = 'src/app/events') {
        readdirSync(dir)
            .forEach(file => {
                console.log(file)
                const filePath = `${dir}/${file}`

                try {
                    if (file.endsWith('.js')) {
                        const Listener = require(filePath)
                        return this.client.on(file.replace(/.js/g, ''), Listener)
                    } else if (lstatSync(filePath).isDirectory()) {
                        return this.handleEvents()
                    }
                } catch (e) {
                    console.error(e)
                }
            })
    }
}
const { Handler, Controller } = require("../..")
const { readdirSync } = require('fs');

module.exports = class ControllerH extends Handler {
    constructor(client) {
        super({}, client)

        this.controllers = {}
    }

    async build() {
        try {
            await this.handleControllers()
            this.client.controllers = this.controllers
            return true
        } catch (e) {
            console.error(e)
        }
        return false
    }

    async handleControllers(dir = 'C:/Users/PATRICIA/Desktop/Jobs/Github/zhon-bot/src/client/controllers') {
        let success = 0
        let failed = 0
        readdirSync(dir)
            .forEach(async (file) => {
                const filePath = `${dir}/${file}`

                try {
                    success++
                    if (file.endsWith('.js')) {
                        const Controller = require(filePath)
                        const controllerName = file.replace(/.js/g, '').toLowerCase()
                        const controller = new Controller(this.client, controllerName)

                        return await this.addController(controller)
                    } else if (lstatSync(filePath).isDirectory()) {
                        return this.handleControllers(filePath)
                    }
                } catch (e) {
                    failed++
                    console.error(e)
                }
            })
    }

    async addController(controller) {
        if (!(controller instanceof Controller)) {
            console.log(`[Controllers] ${controller.name} failed to attempt to load. - Controller didn't start.`)
            return false
        }

        if (controller.canLoad() !== true) {
            console.log(`[Controllers] ${controller.name} failed to attempt to load. - canLoad function didn't start.`)
            return false
        }

        this.controllers[controller.name] = await controller.build()
        return true
    }
}
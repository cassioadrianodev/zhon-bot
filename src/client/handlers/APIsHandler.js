const { Handler, Wrapper } = require("../..")
const { readdirSync } = require('fs');

module.exports = class APIs extends Handler {
    constructor(client) {
        super({}, client)

        this.apis = {}
    }

    async build() {
        try {
            await this.handleAPIs()
            this.client.apis = this.apis
            return true
        } catch (e) {
            console.error(e)
        }
        return false
    }

    async handleAPIs(dir = 'C:/Users/PATRICIA/Desktop/Jobs/Github/zhon-bot/src/client/apis') {
        let success = 0
        let failed = 0
        readdirSync(dir)
            .forEach(async (file) => {
                const filePath = `${dir}/${file}`

                try {
                    success++
                    if (file.endsWith('.js')) {
                        const API = require(filePath)
                        const apiName = file.replace(/.js/g, '').toLowerCase()
                        const api = new API(apiName)

                        if (failed > success) console.log(`[APIs] ${failed} APIs were not loaded successfully. And ${success} were loaded successfully.`)
                        else console.log(`[APIs] ${success} APIs were loaded successfully. And ${failed} were not loaded successfully.`)
                        
                        return await this.addAPI(api)
                    } else if (lstatSync(filePath).isDirectory()) {
                        return this.handleAPIs(filePath)
                    }
                } catch (e) {
                    failed++
                    console.error(e)
                }
            })
    }

    async addAPI(api) {
        if (!(api instanceof Wrapper)) {
            console.log(`[APIs] ${api.name} failed to attempt to load. - Wrapper didn't start.`)
            return false
        }

        if (api.canLoad() !== true) {
            console.log(`[APIs] ${api.name} failed to attempt to load. - canLoad function didn't start.`)
            return false
        }

        if (!api.envVars.every(variable => {
            if (!process.env[variable]) console.log(`[APIs] ${api.name} failed to attempt to load. - Variable ${variable} is not set.`)
            return !!process.env[variable]
        })) return false

        this.apis[api.name] = await api.build()
        return true
    }
}
module.exports = class Wrapper {
    constructor (options = {}) {
        this.name = options.name
        this.envVars = options.envVars || []
    }

    canLoad () {
        return true
    }

    build () {
        return this
    }
}
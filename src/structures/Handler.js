const Zhon = require("../Zhon")

module.exports = class Handler {
    /**
     * @constructor
     * @param {Zhon} client The Zhon Client.
     * @param {String} name Name of Structure.
     * @param {Object} options Options are a Object.
     */
    constructor (name, client) {
        this.client = client

        this.name = name
        this.critical = false
    }

    build() {
        return true
    }
}
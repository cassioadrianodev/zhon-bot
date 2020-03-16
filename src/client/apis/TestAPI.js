const { Wrapper } = require("../..");

module.exports = class TestAPI extends Wrapper {
    constructor () {
        super ({
            name: 'test'
        })
    }

    nameReturn (userName) {
        if (!userName) throw new Error('UserName are required.')
        return userName
    }
}
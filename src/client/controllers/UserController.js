const { Controller } = require("../..")

module.exports = class UserController extends Controller {
    constructor (client) {
        super ({
            name: 'userController'
        }, client)
    }

    canLoad () {
        return !!this.client.database
    }

    get _users () {
        return this.client.database.users
    }

    /**
     * Returns the amount of money the user has. 
     * @param {String} _user User ID
     */
    async balance (_user) {
        const { money } = await this._users.findOne(_user)
        return money
    }
}
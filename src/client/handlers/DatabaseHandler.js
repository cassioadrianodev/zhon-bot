const { Handler } = require("../..");
const { MongoDB } = require("../database");

module.exports = class Database extends Handler {
    constructor(client) {
        super('Database', client)
    }

    build() {
        return this.handleDatabase(MongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    handleDatabase(DBWrapper = MongoDB, options = {}) {
        this.client.database = new DBWrapper(options)
        this.client.database.connect()
            .then(() => console.log('[Database] The connection to the database has been made.'))
            .catch(e => {
                console.error(e)
                this.client.database = null
            })
    }
}
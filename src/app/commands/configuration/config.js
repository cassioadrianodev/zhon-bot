const { Command } = require("../../..");

module.exports = class Configuration extends Command {
    constructor (client) {
        super ({
            name: 'config',
            aliases: ['configuration', 'cfg'],
            category: 'Configuração',
            description: 'Configure os sistemas do Zhon.',
            usage: '{{p}}'
        }, client)
    }
}
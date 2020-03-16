const { config } = require('dotenv')
const { readFileSync } = require('fs')

config() // Run dotenv Configuration.
console.log(readFileSync('bigText.txt', 'utf8').toString()) // Big Title in Console.

const Zhon = require('./src/Zhon.js')
const client = new Zhon()

client.handleStructures() // Registering and loading structures.

client.login(process.env.DISCORD_TOKEN)
 .then(() => console.log('[Zhon] Connections between Server and Discord initialized.'))
 .catch(console.error) // Running connection between Server and Discord.
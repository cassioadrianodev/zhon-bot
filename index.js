const { config } = require('dotenv')
const { readFileSync } = require('fs')

config() // Run dotenv Configuration.
console.log(readFileSync('bigText.txt', 'utf8').toString()) // Big Title in Console.

const app = new (require('./src/Zhon'))

app.handleStructures() // Structures Handler
app.login(process.env.DISCORD_TOKEN)
 .then(() => console.log('[App] Connected with successfully.'))
 .catch(console.error)
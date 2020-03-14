module.exports = async function onReady() {
    this.user.setPresence({ activity: { name: 'Testing...' } })
}
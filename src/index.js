const CommandStructures = require('./structures/command')

module.exports = {
    /** Structures */
    Handler: require('./structures/Handler'),
    Wrapper: require('./structures/Wrapper'),
    ZhonEmbed: require('./structures/ZhonEmbed'),

    /** Structures Command */
    CommandStructures,
    Command: CommandStructures.Command,
    CommandContext: CommandStructures.CommandContext,

    /** Utils */
    FileUtils: require('./client/utils/FileUtils'),
}
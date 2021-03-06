const CommandStructures = require('./structures/command')

module.exports = {
    /** Structures */
    Handler: require('./structures/Handler'),
    Wrapper: require('./structures/Wrapper'),
    ZhonEmbed: require('./structures/ZhonEmbed'),
    Controller: require('./structures/Controller'),

    /** Structures Command */
    CommandStructures,
    Command: CommandStructures.Command,
    CommandContext: CommandStructures.CommandContext,
    CommandUtils: CommandStructures.CommandUtils,

    /** Utils */
    FileUtils: require('./client/utils/FileUtils'),
}
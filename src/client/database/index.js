module.exports = {
  // Base structures
  DBWrapper: require('./DBWrapper.js'),
  Repository: require('./Repository.js'),

  // DBWrappers
  MongoDB: require('./mongo/MongoDB.js'),

  // Schemas
  User: require('./mongo/schemas/UserSchema'),
  Guild: require('./mongo/schemas/GuildSchema')
}

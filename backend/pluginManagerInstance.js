const PluginManager = require('./pluginManager');

const pluginManager = new PluginManager();
pluginManager.loadPlugins('./plugins'); // Load plugins from the directory

module.exports = pluginManager;
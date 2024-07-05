const fs = require('fs');
const path = require('path');

class PluginManager {
  constructor() {
    this.plugins = [];
  }

  loadPlugins(pluginsDir) {
    const fullPath = path.resolve(__dirname, pluginsDir); // Resolve the path to plugins directory

    fs.readdirSync(fullPath).forEach(file => {
      if (file.endsWith('.js')) { // Only require .js files
        const PluginClass = require(path.join(fullPath, file));
        const plugin = new PluginClass();
        this.plugins.push(plugin);
      }
    });
  }

  async handleMessage(message, context) {
    for (const plugin of this.plugins) {
      await plugin.handleMessage(message, context);
      if (context.response) {
        break; // Stop further processing if a response is set
      }
    }
  }
}

module.exports = PluginManager;
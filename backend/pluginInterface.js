class PluginInterface {
    initialize(app) {
      // Optionally use the `app` instance for additional setup
    }
  
    async handleMessage(message, context) {
      // Method to be overridden by plugins
    }
  }
  
  module.exports = PluginInterface;
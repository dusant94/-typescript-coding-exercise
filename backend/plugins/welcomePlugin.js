const PluginInterface = require('../pluginInterface');

class WelcomePlugin extends PluginInterface {
  async handleMessage(message, context) {
    if (message.message.toLowerCase() === 'hello') {
      context.response = 'Welcome to the chat!';
    }
  }
}

module.exports = WelcomePlugin;
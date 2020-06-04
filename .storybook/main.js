const path = require('path')

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async (config, configType) => {
    config.node = { fs: 'empty', child_process: 'empty' }
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    return config
  }
}

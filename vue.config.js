// vue.config.js
const webpack = require('webpack')
// const path = require('path')

module.exports = {
  configureWebpack: {
    // resolve: {
    //   alias: {
    //     core: path.resolve(__dirname, '../core')
    //   }
    // },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1
      })
    ]
  },
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  }
}

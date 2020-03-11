const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const appDate = require('./public/mock/data.json')
const ratings = appDate.ratings

// process.env.MOCK // 由package中scripts提供
module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/svg-icons'))
      .end()
    config.module
      .rule('svg-icons')
      .test(/\.svg$/)
      .include.add(resolve('src/svg-icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

      config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

      config
      .when(true,
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        })
  },
  devServer: {
    port: '3000',
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before(app) { // mock数据
      app.get('/api/ratings', function(req, res) { // 请求该地址返回的数据
        res.json({
          errno: 0, // 成功标识
          data: ratings
        })
      })
    },
    proxy: { // 代理请求
      "/api": {
        target: "http://192.168.20.29",
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api': ''
        },
      }
    }
  }
}

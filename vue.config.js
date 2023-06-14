const path = require('path')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const compress = new CompressionWebpackPlugin(
  {
    filename: info => {
      return `${info.path}.gz${info.query}`
    },
    algorithm: 'gzip', 
    threshold: 10240,
    test: new RegExp(
      '\\.(' +
      ['js'].join('|') +
      ')$'
    ),
    minRatio: 0.8,
    deleteOriginalAssets: false
  }
)

function resolve(dir) {
  return path.join(__dirname, dir)
}

const appDate = require('./public/mock/data.json')
const ratings = appDate.ratings

// 预渲染
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

// process.env.MOCK // 由package中scripts提供
module.exports = {
  publicPath: './',
  outputDir: 'my-element-vue',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [compress]
  },
  // configureWebpack: () => {
  //   if (process.env.NODE_ENV !== 'production') return
  //   return {
  //     plugins: [
  //       new PrerenderSPAPlugin({
  //         // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
  //         staticDir: path.join(__dirname, 'dist'), // 生成文件的路径，也可以与webpakc打包的一致。
  //         routes: ['/', '/front/cart'], // 对应自己的路由路径
  //         renderer: new Renderer({ // 这个很重要，如果没有配置这段，也不会进行预编译
  //           inject: {
  //             foo: 'bar'
  //           },
  //           headless: false,
  //           // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
  //           renderAfterDocumentEvent: 'render-event'
  //         })
  //       }),
  //     ],
  //   }
  // },
  transpileDependencies: ['vue-clamp', 'resize-detector'], // vue-clamp组件需要
  // css: { // 从js中提取css包
  //   extract: true
  // },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') config.optimization.minimize(true) // 压缩代码
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

    config.plugin('monaco-editor').use(new MonacoWebpackPlugin({
      languages: ['javascript', 'typescript', 'css', 'html'],
    }))

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
                echarts: {
                  name: 'chunk-echarts',
                  test: /[\\/]node_modules[\\/]_?echarts(.*)/,
                  priority: 30,
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
    open: true, // dev 后主动打开浏览器
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

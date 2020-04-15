module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8081/',
        changeOrigin: true,
      },
    },
  },
  // chainWebpack: (config) => {
  //   const svgRule = config.module.rule('svg');
  //   svgRule.uses.clear();
  //   svgRule
  //     .use('svg-sprite-loader')
  //     .loader('svg-sprite-loader')
  //     .options({
  //       symbolId: '[name]',
  //     });
  // },
};

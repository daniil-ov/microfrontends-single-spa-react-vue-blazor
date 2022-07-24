const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "sut";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });



  return merge(defaultConfig, {

    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'src/static' },
          { from: 'src/style.css' }
        ]
      }),
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
        },
      }),
    ],
  });

};

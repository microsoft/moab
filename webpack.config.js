const Encore = require('@symfony/webpack-encore');

Encore
  .setOutputPath('build')
  //.setPublicPath('/fresh-moab-sandbox/build')  //for fresh site directory
  .setPublicPath('/build')
  .setManifestKeyPrefix('build')
  .addEntry('app', './js/app.js')
  .enableSingleRuntimeChunk()
  .enableSourceMaps(!Encore.isProduction())
  .enableSassLoader()
;

if (Encore.isProduction()) {
  Encore
    .setPublicPath('/moab/build')
    .cleanupOutputBeforeBuild()
    .enableVersioning()
  ;
}

module.exports = Encore.getWebpackConfig();

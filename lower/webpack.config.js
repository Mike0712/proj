const Encore = require('@symfony/webpack-encore');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const Dotenv = require('dotenv-webpack');

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/index.tsx')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild(['**/*'], (options) => {
        options.verbose = true;
        options.exclude = ['index.php', 'public/index.php'];

        return options;
    })
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())
    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties');
    })
    // aliases
    .addAliases({
        'api': path.resolve(__dirname, './assets/api'),
        'components': path.resolve(__dirname, './assets/components'),
        'hooks': path.resolve(__dirname, './assets/hooks'),
        'layouts': path.resolve(__dirname, './assets/layouts'),
        'locales': path.resolve(__dirname, './assets/locales'),
        'pages': path.resolve(__dirname, './assets/pages'),
        'routes': path.resolve(__dirname, './assets/routes'),
        'store': path.resolve(__dirname, './assets/store'),
        'styles': path.resolve(__dirname, './assets/styles'),
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    .enableTypeScriptLoader(function(tsConfig) {
        tsConfig.configFile = './../tsconfig.json';
    })

    // uncomment if you use React
    .enableReactPreset()
    // Eslint plugin
    .addPlugin(new ESLintPlugin({
        extensions: ['js', 'jsx', 'ts', 'tsx'],
        exclude: [
            'node_modules',
            'vendor'
        ],
    }))
    // Dotenv plugin
    .addPlugin(new Dotenv({
        path: './assets/.env'
    }))
    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
    ;

module.exports = Encore.getWebpackConfig();

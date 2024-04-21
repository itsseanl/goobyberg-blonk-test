const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");

//workaround for hot reloading, the wordpress scripts implementation wasnt working for me.
module.exports = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins,
		new BrowserSyncPlugin({
			// browse to http://localhost:3000/ during development,
			// ./public directory is being served
			host: "localhost",
			port: 3000,
			proxy: "https://wpdoodle.lndo.site/",
		}),
	],
};

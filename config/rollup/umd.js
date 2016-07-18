import config from './es6.js';

const packageInfo = require( '../../package.json' );
packageInfo.name = 'css-filter';

config.format = 'umd',
config.moduleName = 'cssFilter';
config.dest = `dist/${packageInfo.name}.umd.js`;

export default config;

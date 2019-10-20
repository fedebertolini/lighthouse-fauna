const argv = require('minimist')(process.argv.slice(2));

exports.getUrl = () => argv._[0] || process.env.URL;

exports.getRuns = () => argv.runs || process.env.RUNS || 3;

exports.getBlockedUrlPatterns = () => {
    const param = argv['blocked-url-patterns'] || process.env.BLOCKED_URL_PATTERNS || '';
    return param ? param.split(',') : [];
};

exports.getChromeFlags = () => {
    const param = argv['chrome-flags'] || process.env.CHROME_FLAGS || '';
    return param ? param.split(',') : ['--no-sandbox', '--headless', '--incognito'];
};

exports.getFaunadbKey = () => argv['faunadb-key'] || process.env.FAUNADB_KEY || null;

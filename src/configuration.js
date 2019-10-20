const argv = require('minimist')(process.argv.slice(2));

exports.getUrl = () => {
    const url = argv._[0] || process.env.URL;
    if (!url) {
        throw new Error('Missing required parameter url');
    }
    return url;
};

exports.getPageId = () => {
    const pageId = argv['page-id'] || process.env.PAGE_ID;
    if (!pageId) {
        throw new Error('Missing required parameter page-id');
    }
    return pageId;
};

exports.getRuns = () => argv.runs || process.env.RUNS || 3;

exports.getBlockedUrlPatterns = () => {
    const param = argv['blocked-url-patterns'] || process.env.BLOCKED_URL_PATTERNS || '';
    return param ? param.split(',') : [];
};

exports.getChromeFlags = () => {
    const param = argv['chrome-flags'] || process.env.CHROME_FLAGS || '';
    return param ? param.split(',') : ['--no-sandbox', '--headless', '--incognito'];
};

exports.getFaunaKey = () => argv['fauna-key'] || process.env.FAUNA_KEY || null;

exports.getFaunaCollectionName = () =>
    argv['fauna-collection-name'] || process.env.FAUNA_COLLECTION_NAME || 'metrics';

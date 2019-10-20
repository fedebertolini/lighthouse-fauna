#! /usr/bin/env node

require('dotenv').config();

const runner = require('./runner');
const aggregate = require('./result-aggregation');
const configuration = require('./configuration');
const faunaClient = require('./fauna-client');

const url = configuration.getUrl();
const runs = configuration.getRuns();

const options = {
    chromeFlags: configuration.getChromeFlags(),
};
const config = {
    extends: 'lighthouse:default',
    passes: [
        {
            blockedUrlPatterns: configuration.getBlockedUrlPatterns(),
        },
    ],
};

const results = [];

(async () => {
    try {
        for (let i = 0; i < runs; i++) {
            const result = await runner.run(url, options, config);
            results.push(result);
        }

        const aggregatedResults = aggregate(results);
        await faunaClient.createMetric(aggregatedResults, 'everyplate-homepage');

        console.log(aggregatedResults);
    } catch (error) {
        console.error(error);
    }
})();

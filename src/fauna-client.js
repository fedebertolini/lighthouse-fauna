const faunadb = require('faunadb');
const configuration = require('./configuration');

exports.createMetric = async (metric, pageId) => {
    const key = configuration.getFaunadbKey();
    if (!key) {
        throw new Error('Missing FaunaDb key');
    }

    const client = new faunadb.Client({ secret: key });
    const q = faunadb.query;
    const data = {
        ...metric,
        pageId,
    };
    await client.query(q.Create(q.Collection('metrics'), { data }));
};

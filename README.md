# lighthouse-fauna

NodeJS application that get metrics from a website using [lighthouse](https://github.com/GoogleChrome/lighthouse/) and stores them in a [FaunaDB](https://fauna.com) collection.

## Installation

`npm i -g lighthouse-fauna`

## Usage

`lighthouse-fauna url [flags]`

### Flags

-   `--runs` (Number, defaults to `3`): number of lighthouse runs. If `runs` is greater than 1, then the median of all runs is stored.
-   `--page-id` (String, required): page identifier, can be utilized to differenciate lighthouse metrics between different pages.
-   `--blocked-url-patterns` (Values separated by commas, defaults to empty string): set this argument to tell Chrome what URLs of requests to block while loading the page. Basic wildcard support using `*`.
-   `--chrome-flags` (Values separated by commas, defaults to `--no-sandbox,--headless,--incognito`): set this to pass custom flags to Chrome.
-   `--fauna-key` (String, required): FaunaDB's private key. Must have `server` or `admin` access.
-   `--fauna-collection-name` (String, defaults to `metrics`): FaunaDB's collection's name where the metrics will be created.

The following command will run `lighthouse` 5 times on `https://www.example.com`, and will store the metrics in a FaunaDB collection named `lighthouse-metrics`:

`lighthouse-fauna https://www.example.com --run=5 --fauna-key=12345 --fauna-collection-name=lighthouse-metrics --page-id=example.com`

### Environment variables

Instead of passing the flags in the command line, you can specify the same parameters as environment variables. If a parameter is defined as a command-line flag and an environment variable, the flag will be used. These are the environment variable names and their associated command-line flag:

-   `URL`: `url`
-   `PAGE_ID`: `--page-id`
-   `RUNS`: `--runs`
-   `BLOCKED_URL_PATTERNS`: `--blocked-url-patterns`
-   `CHROME_FLAGS`: `--chrome-flags`
-   `FAUNA_KEY`: `--fauna-key`
-   `FAUNA_COLLECTION_NAME`: `--fauna-collection-name`

## Metrics

The app will collect a sub-set of metrics returned by `lighthouse`, most of them are related to performance. The documentation of these metrics can be found in the [Audit Reference section](https://developers.google.com/web/tools/lighthouse/) of the Lighthouse documentation.

The metrics that are currently collected are:

-   firstContentfulPaint
-   firstMeaningfulPaint
-   speedIndex
-   estimatedInputLatency
-   totalBlockingTime
-   maxPotentialFid
-   timeToFirstByte
-   firstCpuIdle
-   interactive
-   networkRequests
-   totalByteWeight
-   domSize
-   performanceScore
-   pwaScore
-   accessibilityScore
-   bestPracticesScore
-   seoScore

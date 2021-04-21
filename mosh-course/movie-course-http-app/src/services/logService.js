import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://e52a109a69ea40f1bbe86bcf6ed6c173@o575995.ingest.sentry.io/5729047",
        integrations: [new Integrations.BrowserTracing()],
        environment: "development-test",

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    Sentry.captureException(error);
}

export default {
    init,
    log,
};

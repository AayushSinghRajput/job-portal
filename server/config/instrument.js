import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

Sentry.init({
  dsn: "https://bcf9ea38dbbcc1c4ace9b7d8fb34784c@o4509201706844160.ingest.de.sentry.io/4509201715953744",
  integrations: [nodeProfilingIntegration(), Sentry.mongooseIntegration()],
  //   tracesSampleRate: 1.0, //Capture 100% of the transactions
});
Sentry.profiler.startProfiler();

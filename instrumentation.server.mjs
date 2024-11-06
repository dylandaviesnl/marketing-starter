import * as Sentry from '@sentry/remix'

Sentry.init({
	dsn: 'https://104c7b769354104494116d9b9f6195fd@o4506031621603328.ingest.us.sentry.io/4508252001009664',
	tracesSampleRate: 1,
	autoInstrumentRemix: true,
})

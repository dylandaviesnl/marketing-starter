import * as Sentry from '@sentry/remix'
import { RemixBrowser, useLocation, useMatches } from '@remix-run/react'
import { startTransition, useEffect } from 'react'
import { hydrateRoot } from 'react-dom/client'

Sentry.init({
	dsn: 'https://104c7b769354104494116d9b9f6195fd@o4506031621603328.ingest.us.sentry.io/4508252001009664',
	tracesSampleRate: 1,

	integrations: [
		Sentry.browserTracingIntegration({
			useEffect,
			useLocation,
			useMatches,
		}),
		Sentry.replayIntegration({
			maskAllText: true,
			blockAllMedia: true,
		}),
	],

	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1,
})

if (ENV.MODE === 'production' && ENV.SENTRY_DSN) {
	void import('./utils/monitoring.client.tsx').then(({ init }) => init())
}

startTransition(() => {
	hydrateRoot(document, <RemixBrowser />)
})

// vite.config.ts
import { vitePlugin as remix } from 'file:///Users/dylan/Dev/epic-starter/marketing-starter/node_modules/@remix-run/dev/dist/index.js'
import { sentryVitePlugin } from 'file:///Users/dylan/Dev/epic-starter/marketing-starter/node_modules/@sentry/vite-plugin/dist/esm/index.mjs'
import { glob } from 'file:///Users/dylan/Dev/epic-starter/marketing-starter/node_modules/glob/dist/esm/index.js'
import { flatRoutes } from 'file:///Users/dylan/Dev/epic-starter/marketing-starter/node_modules/remix-flat-routes/dist/index.js'
import { defineConfig } from 'file:///Users/dylan/Dev/epic-starter/marketing-starter/node_modules/vite/dist/node/index.js'
import { envOnlyMacros } from 'file:///Users/dylan/Dev/epic-starter/marketing-starter/node_modules/vite-env-only/dist/index.js'
var MODE = process.env.NODE_ENV
var vite_config_default = defineConfig({
	build: {
		cssMinify: MODE === 'production',
		rollupOptions: {
			external: [/node:.*/, 'fsevents'],
		},
		assetsInlineLimit: (source) => {
			if (
				source.endsWith('sprite.svg') ||
				source.endsWith('favicon.svg') ||
				source.endsWith('apple-touch-icon.png')
			) {
				return false
			}
		},
		sourcemap: true,
	},
	server: {
		watch: {
			ignored: ['**/playwright-report/**'],
		},
	},
	plugins: [
		envOnlyMacros(),
		// it would be really nice to have this enabled in tests, but we'll have to
		// wait until https://github.com/remix-run/remix/issues/9871 is fixed
		process.env.NODE_ENV === 'test'
			? null
			: remix({
					ignoredRouteFiles: ['**/*'],
					serverModuleFormat: 'esm',
					future: {
						unstable_optimizeDeps: true,
						v3_fetcherPersist: true,
						v3_lazyRouteDiscovery: true,
						v3_relativeSplatPath: true,
						v3_throwAbortReason: true,
					},
					routes: async (defineRoutes) => {
						return flatRoutes('routes', defineRoutes, {
							ignoredRouteFiles: [
								'.*',
								'**/*.css',
								'**/*.test.{js,jsx,ts,tsx}',
								'**/__*.*',
								// This is for server-side utilities you want to colocate
								// next to your routes without making an additional
								// directory. If you need a route that includes "server" or
								// "client" in the filename, use the escape brackets like:
								// my-route.[server].tsx
								'**/*.server.*',
								'**/*.client.*',
							],
						})
					},
				}),
		process.env.SENTRY_AUTH_TOKEN
			? sentryVitePlugin({
					disable: MODE !== 'production',
					authToken: process.env.SENTRY_AUTH_TOKEN,
					org: process.env.SENTRY_ORG,
					project: process.env.SENTRY_PROJECT,
					release: {
						name: process.env.COMMIT_SHA,
						setCommits: {
							auto: true,
						},
					},
					sourcemaps: {
						filesToDeleteAfterUpload: await glob([
							'./build/**/*.map',
							'.server-build/**/*.map',
						]),
					},
				})
			: null,
		sentryVitePlugin({
			org: 'dylan-davies',
			project: 'marketing-starter',
		}),
	],
	test: {
		include: ['./app/**/*.test.{ts,tsx}'],
		setupFiles: ['./tests/setup/setup-test-env.ts'],
		globalSetup: ['./tests/setup/global-setup.ts'],
		restoreMocks: true,
		coverage: {
			include: ['app/**/*.{ts,tsx}'],
			all: true,
		},
	},
})
export { vite_config_default as default }
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZHlsYW4vRGV2L2VwaWMtc3RhcnRlci9tYXJrZXRpbmctc3RhcnRlclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2R5bGFuL0Rldi9lcGljLXN0YXJ0ZXIvbWFya2V0aW5nLXN0YXJ0ZXIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2R5bGFuL0Rldi9lcGljLXN0YXJ0ZXIvbWFya2V0aW5nLXN0YXJ0ZXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB2aXRlUGx1Z2luIGFzIHJlbWl4IH0gZnJvbSAnQHJlbWl4LXJ1bi9kZXYnXG5pbXBvcnQgeyBzZW50cnlWaXRlUGx1Z2luIH0gZnJvbSAnQHNlbnRyeS92aXRlLXBsdWdpbidcbmltcG9ydCB7IGdsb2IgfSBmcm9tICdnbG9iJ1xuaW1wb3J0IHsgZmxhdFJvdXRlcyB9IGZyb20gJ3JlbWl4LWZsYXQtcm91dGVzJ1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB7IGVudk9ubHlNYWNyb3MgfSBmcm9tICd2aXRlLWVudi1vbmx5J1xuXG5jb25zdCBNT0RFID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlZcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0YnVpbGQ6IHtcblx0XHRjc3NNaW5pZnk6IE1PREUgPT09ICdwcm9kdWN0aW9uJyxcblxuXHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdGV4dGVybmFsOiBbL25vZGU6LiovLCAnZnNldmVudHMnXSxcblx0XHR9LFxuXG5cdFx0YXNzZXRzSW5saW5lTGltaXQ6IChzb3VyY2U6IHN0cmluZykgPT4ge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRzb3VyY2UuZW5kc1dpdGgoJ3Nwcml0ZS5zdmcnKSB8fFxuXHRcdFx0XHRzb3VyY2UuZW5kc1dpdGgoJ2Zhdmljb24uc3ZnJykgfHxcblx0XHRcdFx0c291cmNlLmVuZHNXaXRoKCdhcHBsZS10b3VjaC1pY29uLnBuZycpXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdHNvdXJjZW1hcDogdHJ1ZSxcblx0fSxcblx0c2VydmVyOiB7XG5cdFx0d2F0Y2g6IHtcblx0XHRcdGlnbm9yZWQ6IFsnKiovcGxheXdyaWdodC1yZXBvcnQvKionXSxcblx0XHR9LFxuXHR9LFxuXHRwbHVnaW5zOiBbXG4gICAgICAgIGVudk9ubHlNYWNyb3MoKSxcbiAgICAgICAgLy8gaXQgd291bGQgYmUgcmVhbGx5IG5pY2UgdG8gaGF2ZSB0aGlzIGVuYWJsZWQgaW4gdGVzdHMsIGJ1dCB3ZSdsbCBoYXZlIHRvXG4gICAgICAgIC8vIHdhaXQgdW50aWwgaHR0cHM6Ly9naXRodWIuY29tL3JlbWl4LXJ1bi9yZW1peC9pc3N1ZXMvOTg3MSBpcyBmaXhlZFxuICAgICAgICBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Rlc3QnXG5cdFx0XHQ/IG51bGxcblx0XHRcdDogcmVtaXgoe1xuXHRcdFx0XHRcdGlnbm9yZWRSb3V0ZUZpbGVzOiBbJyoqLyonXSxcblx0XHRcdFx0XHRzZXJ2ZXJNb2R1bGVGb3JtYXQ6ICdlc20nLFxuXHRcdFx0XHRcdGZ1dHVyZToge1xuXHRcdFx0XHRcdFx0dW5zdGFibGVfb3B0aW1pemVEZXBzOiB0cnVlLFxuXHRcdFx0XHRcdFx0djNfZmV0Y2hlclBlcnNpc3Q6IHRydWUsXG5cdFx0XHRcdFx0XHR2M19sYXp5Um91dGVEaXNjb3Zlcnk6IHRydWUsXG5cdFx0XHRcdFx0XHR2M19yZWxhdGl2ZVNwbGF0UGF0aDogdHJ1ZSxcblx0XHRcdFx0XHRcdHYzX3Rocm93QWJvcnRSZWFzb246IHRydWUsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRyb3V0ZXM6IGFzeW5jIChkZWZpbmVSb3V0ZXMpID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBmbGF0Um91dGVzKCdyb3V0ZXMnLCBkZWZpbmVSb3V0ZXMsIHtcblx0XHRcdFx0XHRcdFx0aWdub3JlZFJvdXRlRmlsZXM6IFtcblx0XHRcdFx0XHRcdFx0XHQnLionLFxuXHRcdFx0XHRcdFx0XHRcdCcqKi8qLmNzcycsXG5cdFx0XHRcdFx0XHRcdFx0JyoqLyoudGVzdC57anMsanN4LHRzLHRzeH0nLFxuXHRcdFx0XHRcdFx0XHRcdCcqKi9fXyouKicsXG5cdFx0XHRcdFx0XHRcdFx0Ly8gVGhpcyBpcyBmb3Igc2VydmVyLXNpZGUgdXRpbGl0aWVzIHlvdSB3YW50IHRvIGNvbG9jYXRlXG5cdFx0XHRcdFx0XHRcdFx0Ly8gbmV4dCB0byB5b3VyIHJvdXRlcyB3aXRob3V0IG1ha2luZyBhbiBhZGRpdGlvbmFsXG5cdFx0XHRcdFx0XHRcdFx0Ly8gZGlyZWN0b3J5LiBJZiB5b3UgbmVlZCBhIHJvdXRlIHRoYXQgaW5jbHVkZXMgXCJzZXJ2ZXJcIiBvclxuXHRcdFx0XHRcdFx0XHRcdC8vIFwiY2xpZW50XCIgaW4gdGhlIGZpbGVuYW1lLCB1c2UgdGhlIGVzY2FwZSBicmFja2V0cyBsaWtlOlxuXHRcdFx0XHRcdFx0XHRcdC8vIG15LXJvdXRlLltzZXJ2ZXJdLnRzeFxuXHRcdFx0XHRcdFx0XHRcdCcqKi8qLnNlcnZlci4qJyxcblx0XHRcdFx0XHRcdFx0XHQnKiovKi5jbGllbnQuKicsXG5cdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pLFxuICAgICAgICBwcm9jZXNzLmVudi5TRU5UUllfQVVUSF9UT0tFTlxuXHRcdFx0PyBzZW50cnlWaXRlUGx1Z2luKHtcblx0XHRcdFx0XHRkaXNhYmxlOiBNT0RFICE9PSAncHJvZHVjdGlvbicsXG5cdFx0XHRcdFx0YXV0aFRva2VuOiBwcm9jZXNzLmVudi5TRU5UUllfQVVUSF9UT0tFTixcblx0XHRcdFx0XHRvcmc6IHByb2Nlc3MuZW52LlNFTlRSWV9PUkcsXG5cdFx0XHRcdFx0cHJvamVjdDogcHJvY2Vzcy5lbnYuU0VOVFJZX1BST0pFQ1QsXG5cdFx0XHRcdFx0cmVsZWFzZToge1xuXHRcdFx0XHRcdFx0bmFtZTogcHJvY2Vzcy5lbnYuQ09NTUlUX1NIQSxcblx0XHRcdFx0XHRcdHNldENvbW1pdHM6IHtcblx0XHRcdFx0XHRcdFx0YXV0bzogdHJ1ZSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRzb3VyY2VtYXBzOiB7XG5cdFx0XHRcdFx0XHRmaWxlc1RvRGVsZXRlQWZ0ZXJVcGxvYWQ6IGF3YWl0IGdsb2IoW1xuXHRcdFx0XHRcdFx0XHQnLi9idWlsZC8qKi8qLm1hcCcsXG5cdFx0XHRcdFx0XHRcdCcuc2VydmVyLWJ1aWxkLyoqLyoubWFwJyxcblx0XHRcdFx0XHRcdF0pLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pXG5cdFx0XHQ6IG51bGwsXG4gICAgICAgIHNlbnRyeVZpdGVQbHVnaW4oe1xuICAgICAgICAgICAgb3JnOiBcImR5bGFuLWRhdmllc1wiLFxuICAgICAgICAgICAgcHJvamVjdDogXCJtYXJrZXRpbmctc3RhcnRlclwiXG4gICAgICAgIH0pXG4gICAgXSxcblx0dGVzdDoge1xuXHRcdGluY2x1ZGU6IFsnLi9hcHAvKiovKi50ZXN0Lnt0cyx0c3h9J10sXG5cdFx0c2V0dXBGaWxlczogWycuL3Rlc3RzL3NldHVwL3NldHVwLXRlc3QtZW52LnRzJ10sXG5cdFx0Z2xvYmFsU2V0dXA6IFsnLi90ZXN0cy9zZXR1cC9nbG9iYWwtc2V0dXAudHMnXSxcblx0XHRyZXN0b3JlTW9ja3M6IHRydWUsXG5cdFx0Y292ZXJhZ2U6IHtcblx0XHRcdGluY2x1ZGU6IFsnYXBwLyoqLyoue3RzLHRzeH0nXSxcblx0XHRcdGFsbDogdHJ1ZSxcblx0XHR9LFxuXHR9LFxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQStULFNBQVMs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

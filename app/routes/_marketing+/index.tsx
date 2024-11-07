import { type MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => [{ title: 'Epic Notes' }]

export default function Index() {
	return (
		<main className="font-poppins grid h-full place-items-center">
			<div className="grid place-items-center px-4 py-16 xl:grid-cols-2 xl:gap-24">
				<div className="flex max-w-md flex-col items-center text-center xl:order-2 xl:items-start xl:text-left">
					<a
						href="#"
						className="animate-slide-top [animation-fill-mode:backwards] xl:animate-slide-left xl:[animation-delay:0.5s] xl:[animation-fill-mode:backwards]"
					>
						<svg
							className="size-20 text-foreground xl:-mt-4"
							xmlns="http://www.w3.org/2000/svg"
							fill="currentColor"
							viewBox="0 0 100 100"
						>
							<circle
								cx="50"
								cy="50"
								r="48"
								stroke="currentColor"
								stroke-width="4"
								fill="none"
							/>

							<path
								d="M50 10c22 0 40 18 40 40s-18 40-40 40-40-18-40-40c0-17 10-30 28-30 20 0 22 28 2 28s-10-18 0-18h8"
								fill="none"
								stroke="http://localhost:3000/#"
								stroke-width="4"
							/>

							<text
								x="48"
								y="62"
								font-size="40"
								font-family="Arial, sans-serif"
								text-anchor="middle"
								fill="currentColor"
							>
								h
							</text>
						</svg>
					</a>
					<h1
						data-heading
						className="mt-8 animate-slide-top text-4xl font-medium text-foreground [animation-delay:0.3s] [animation-fill-mode:backwards] md:text-5xl xl:mt-4 xl:animate-slide-left xl:text-6xl xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]"
					>
						<a href="#">What's heute?</a>
					</h1>
					<p
						data-paragraph
						className="mt-6 animate-slide-top text-xl/7 text-muted-foreground [animation-delay:0.8s] [animation-fill-mode:backwards] xl:mt-8 xl:animate-slide-left xl:text-xl/6 xl:leading-10 xl:[animation-delay:1s] xl:[animation-fill-mode:backwards]"
					>
						Coming soon.
					</p>
				</div>
			</div>
		</main>
	)
}

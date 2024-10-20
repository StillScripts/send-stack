import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { client } from './client'

export default async function Home() {
	const { data } = await client.api.index.get()
	return (
		<main className="flex flex-col items-center justify-between p-6 lg:p-24">
			<div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
				<p className="static flex w-auto justify-center rounded-xl border border-b border-gray-300 bg-gray-200 bg-gradient-to-b from-zinc-200 p-4 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit">
					THE SEND STACK
				</p>
				<div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:size-auto lg:bg-none">
					<a
						className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
						href="https://bun.sh"
						target="_blank"
						rel="noopener noreferrer"
					>
						Powered By Bun&nbsp;
						<Image
							src="/bun.svg"
							alt="Vercel Logo"
							width={100}
							height={87}
							priority
						/>
					</a>
				</div>
			</div>
			<div className="mt-24 flex gap-4">
				<Button variant="outline" asChild>
					<Link href="https://github.com/StillScripts/send-stack">
						View Source Code
					</Link>
				</Button>
				<Button asChild>
					<Link href="/sign-in">Explore Dashboard</Link>
				</Button>
			</div>

			<div className="mb-32 mt-24 grid text-center lg:mb-0 lg:mt-32 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left xl:mt-48">
				{data?.map(framework => (
					<a
						key={framework.heading}
						href={framework.url}
						className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
						target="_blank"
						rel="noopener noreferrer"
					>
						<h2 className="mb-3 text-2xl font-semibold">
							{framework.heading}{' '}
							<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
								-&gt;
							</span>
						</h2>
						<p className="m-0 max-w-[30ch] text-sm opacity-50">
							{framework.text}
						</p>
					</a>
				))}
			</div>
		</main>
	)
}

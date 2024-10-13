import { hasEnvVars } from '@/utils/supabase/check-env-vars';
import { GeistSans } from 'geist/font/sans';
import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import localfont from 'next/font/local';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Next.js and Supabase Starter Kit',
	description: 'The fastest way to build apps with Next.js and Supabase',
};

const satoshi = localfont({
	src: [
		{
			path: '../../public/fonts/Satoshi-Variable.ttf',
		},
	],

	variable: '--font-satoshi',
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="fi"
			className={GeistSans.className}
			suppressHydrationWarning
		>
			<body className={`${satoshi.className}`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="min-h-screen relative flex flex-col w-full">
						<div className="fixed top-0 left-0 z-10 w-full border-b border-neutral-300 bg-white">
							<nav className="h-12 w-full flex items-center justify-between p-4">
								<span>Kukka digital</span>
							</nav>
						</div>
						<div className="h-12" />
						<div className="flex flex-col md:flex-row size-full">
							{/* <div className="relative w-60 flex-shrink-0">
								<div className="fixed top-0 left-0 w-60 h-screen bg-cyan-500"></div>
							</div> */}
							<div className="w-full">{children}</div>
							{/* <div className="w-96 bg-cyan-500 h-full"></div> */}
						</div>

						<footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16"></footer>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}

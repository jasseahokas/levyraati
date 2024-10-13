import { ThemeProvider } from 'next-themes';
import Link from 'next/link';
import localfont from 'next/font/local';
import Image from 'next/image';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: 'http://localhost:3000';

export const metadata = {
	metadataBase: new URL(defaultUrl),
	title: 'Ala-asteen levyraati',
	description: 'Kukkamökillä 11.-13.10.2024',
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
		<html lang="fi" suppressHydrationWarning>
			<body className={`${satoshi.className}`}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<main className="min-h-screen relative flex flex-col w-full">
						<div className="fixed top-0 left-0 z-10 w-full border-b bg-neutral-900">
							<nav className="h-14 w-full flex items-center justify-center">
								<Image
									src="/logo.svg"
									alt="Kukkakoululainen"
									width={165}
									height={48}
								/>
							</nav>
						</div>
						<div className="h-14" />
						<div className="flex flex-col md:flex-row size-full">
							<div className="w-full">{children}</div>
						</div>

						<footer className="w-full flex flex-col items-center justify-center border-t border-neutral-200 text-center text-sm gap-4 py-16">
							<span>Kukkamökillä 11.-13.10.2024</span>
							<a href="https://github.com/jasseahokas/levyraati">Github</a>
						</footer>
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}

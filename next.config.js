/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'picsum.photos',
				port: '',
			},
			{
				protocol: 'https',
				hostname: 'odtuzylskxoqszhphpfr.supabase.co',
				port: '',
			},
		],
	},
};

module.exports = nextConfig;

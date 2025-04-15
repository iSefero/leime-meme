/** @type {import('next').NextConfig} */
const nextConfig = {
	async redirects() {
		return [
			{
				source: "/",
				destination: "/meme-table",
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;

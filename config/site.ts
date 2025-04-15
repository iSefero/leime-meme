export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Meme list",
	description: "View top 10 memes",
	navItems: [
		{
			label: "Table",
			href: "/meme-table",
		},
		{
			label: "List",
			href: "/meme-list",
		},
	],
};

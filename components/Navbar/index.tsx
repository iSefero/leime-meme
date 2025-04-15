// libs
import NextLink from "next/link";
import clsx from "clsx";

// hero-ui
import {
	Navbar as HeroUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem,
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";

// common
import { siteConfig } from "@/config/site";
import { ThemeSwitcher, Logo } from "@/components";

export const Navbar = () => {
	return (
		<HeroUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand
					as="li"
					className="max-w-fit flex justify-start items-center gap-1"
				>
					<Logo />
					<p className="font-bold text-inherit">MEME</p>
				</NavbarBrand>
				<ul className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map(item => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium"
								)}
								color="foreground"
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>
			<NavbarContent justify="end">
				<NavbarItem className="hidden lg:flex">
					<ThemeSwitcher />
				</NavbarItem>
			</NavbarContent>
		</HeroUINavbar>
	);
};

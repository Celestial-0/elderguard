export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Elderguard",
  description: 
    "Elder Guard provides reliable safety and support for senior citizens through advanced monitoring and personalized care.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "History",
      href: "/history",
    },
    {
      label: "Analytics",
      href: "/analytics",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "History",
      href: "/history",
    },
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Team",
      href: "/about",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/Celestial-0/elderguard",
    twitter: "https://x.com/Celestial_Yash",
    docs: "/docs",
    // discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/YashKumarSingh",
  },
};

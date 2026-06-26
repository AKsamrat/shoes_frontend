export interface NavItem {
  name: string;
  path?: string;
  children?: NavItem[];
}

export const navRoutes: NavItem[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "We Care",
    path: "/WeCare",
  },
  {
    name: "Our Brand",
    path: "/OurBrand",
  }, 
 
  {
    name: "News Feed",
    path: "/NewsFeed",
  },
  {
    name: "Contact",
    path: "/contact",
  },
];

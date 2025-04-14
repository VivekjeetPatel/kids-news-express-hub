
// Define the NavItem interface that can be used throughout the app
export interface NavItem {
  text?: string;
  label?: string;
  to?: string;
  href?: string;
  items?: NavItem[];
  description?: string;
}

// Define menu items for navigation
const menuItems: NavItem[] = [
  {
    label: "Headliners",
    text: "Headliners",
    href: "/headliners",
    to: "/headliners",
  },
  {
    label: "Debates",
    text: "Debates",
    href: "/debates",
    to: "/debates",
  },
  {
    label: "Spice It Up",
    text: "Spice It Up",
    href: "/spice-it-up",
    to: "/spice-it-up",
  },
  {
    label: "Storyboard",
    text: "Storyboard",
    href: "/storyboard",
    to: "/storyboard",
  },
  {
    label: "In the Neighborhood",
    text: "In the Neighborhood",
    href: "/in-the-neighborhood",
    to: "/in-the-neighborhood",
  },
  {
    label: "Learning",
    text: "Learning",
    href: "/learning",
    to: "/learning",
  },
  {
    label: "School News",
    text: "School News",
    href: "/school-news",
    to: "/school-news",
  },
  {
    label: "About",
    text: "About",
    href: "/about",
    to: "/about",
  },
];

export default menuItems;

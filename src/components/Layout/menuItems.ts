
// Menu items configuration for The Flying Bus navigation
export interface NavSubItem {
  text: string;
  description?: string;
  to: string;
  icon?: {
    dark: string;
    light: string;
  };
}

export interface NavItem {
  text: string;
  to?: string;
  items?: NavSubItem[];
}

const menuItems: NavItem[] = [
  {
    text: "Categories",
    items: [
      {
        text: "Headliners",
        description: "Top stories of the day",
        to: "/headliners"
      },
      {
        text: "Debates",
        description: "Join discussions on important topics",
        to: "/debates"
      },
      {
        text: "Spice It Up",
        description: "Fun and interesting stories",
        to: "/spice-it-up"
      },
      {
        text: "Storyboard", 
        description: "Creative writing and stories",
        to: "/storyboard"
      },
      {
        text: "In the Neighborhood",
        description: "Local news and events",
        to: "/neighborhood"
      },
    ]
  },
  {
    text: "Learning",
    items: [
      {
        text: "Learning Resources",
        description: "Educational content for kids",
        to: "/learning"
      },
      {
        text: "School News",
        description: "Latest updates from schools",
        to: "/school"
      }
    ]
  },
  {
    text: "About",
    to: "/about"
  }
];

export default menuItems;

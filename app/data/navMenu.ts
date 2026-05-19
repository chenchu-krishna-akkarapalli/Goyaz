export type NavMenuCard = {
  label: string;
  image: string;
};

export type NavMenuFeatured = {
  image: string;
  title: string;
  description: string;
};

export type NavMenuSection = {
  id: string;
  label: string;
  childPanelMode: "both" | "list-only" | "cards-only";
  subCategories: string[];
  ctaLabel: string;
  featured: NavMenuFeatured;
  cards: NavMenuCard[];
};

export const NAV_MENU_SECONDARY_LINKS = [
  "About",
  "Contact",
  "Find a Store",
  "Customer Care",
] as const;

export const NAV_MENU_ACCOUNT_LINKS = ["Sign Up", "Wishlist"] as const;

const FEATURED_IMAGE = "/images/sections/masterpieces/frame48.avif";
const IMAGE_1 = "/images/sections/current-obsessions/frame32.avif";
const IMAGE_2 = "/images/sections/current-obsessions/frame37.avif";
const IMAGE_3 = "/images/sections/current-obsessions/frame38.avif";
const IMAGE_4 = "/images/sections/current-obsessions/frame39.avif";
const IMAGE_5 = "/images/sections/current-obsessions/frame40.avif";
const IMAGE_6 = "/images/sections/current-obsessions/frame41.avif";

export const NAV_MENU_SECTIONS: NavMenuSection[] = [
  {
    id: "collections",
    label: "Collections",
    childPanelMode: "both",
    subCategories: [
      "Nakshi",
      "Polki",
      "Kundan",
      "Temple",
      "Zari",
      "Modern Icons",
    ],
    ctaLabel: "Discover all collections",
    featured: {
      image: FEATURED_IMAGE,
      title: "Every collection tells a different silver story",
      description:
        "Browse house signatures, occasion-led edits, and cultural inspirations that shape the Goyaz point of view.",
    },
    cards: [
      { label: "Nakshi", image: IMAGE_1 },
      { label: "Polki", image: IMAGE_2 },
      { label: "Kundan", image: IMAGE_3 },
      { label: "Temple", image: IMAGE_6 },
    ],
  },
  {
    id: "jewelry",
    label: "Jewelry",
    childPanelMode: "cards-only",
    subCategories: ["Rings", "Bracelets", "Necklaces", "Earrings", "Men", "Women"],
    ctaLabel: "Discover all jewels",
    featured: {
      image: FEATURED_IMAGE,
      title: "India's Largest Premium Silver Destination",
      description:
        "Join the Goyaz Inner Circle. Get early access to new collections and exclusive bridal offers.",
    },
    cards: [
      { label: "Bracelet", image: IMAGE_2 },
      { label: "Rings", image: IMAGE_3 },
      { label: "Earrings", image: IMAGE_4 },
      { label: "Necklaces", image: IMAGE_5 },
    ],
  },
  {
    id: "engagement-bridal",
    label: "Bridal",
    childPanelMode: "both",
    subCategories: [
      "Engagement Rings",
      "Bridal Sets",
      "Wedding Bands",
      "Mangalsutras",
      "Solitaires",
      "Bridesmaid Gifts",
    ],
    ctaLabel: "Discover bridal jewels",
    featured: {
      image: FEATURED_IMAGE,
      title: "Bridal silver that feels heirloom-worthy",
      description:
        "Explore statement-ready silhouettes for engagements, mehendi celebrations, pheras, and the first festivities after.",
    },
    cards: [
      { label: "Solitaires", image: IMAGE_3 },
      { label: "Wedding Bands", image: IMAGE_5 },
      { label: "Bridal Sets", image: IMAGE_2 },
      { label: "Gifting", image: IMAGE_6 },
    ],
  },
  {
    id: "gifts",
    label: "Gifts",
    childPanelMode: "cards-only",
    subCategories: [
      "Under 5K",
      "Under 10K",
      "Festive Gifts",
      "Personalised Picks",
      "Gift Cards",
      "Corporate Gifting",
    ],
    ctaLabel: "Discover gifting edits",
    featured: {
      image: FEATURED_IMAGE,
      title: "Meaningful gifting for every milestone",
      description:
        "Choose from signature silver keepsakes, occasion-ready edits, and thoughtful pieces that arrive beautifully boxed.",
    },
    cards: [
      { label: "Keepsakes", image: IMAGE_1 },
      { label: "Celebration", image: IMAGE_4 },
      { label: "Gift Sets", image: IMAGE_2 },
      { label: "Everyday Silver", image: IMAGE_6 },
    ],
  },
  {
    id: "high-jewelry",
    label: "High Jewelry",
    childPanelMode: "both",
    subCategories: [
      "Statement Necklaces",
      "Cocktail Rings",
      "Heritage Sets",
      "Collector Pieces",
      "Gemstone Stories",
      "Limited Editions",
    ],
    ctaLabel: "Discover high jewelry",
    featured: {
      image: FEATURED_IMAGE,
      title: "Crafted to command the room",
      description:
        "From gemstone-centered silhouettes to museum-inspired detail, this edit brings dramatic silver into focus.",
    },
    cards: [
      { label: "Collector Pieces", image: IMAGE_5 },
      { label: "Gemstones", image: IMAGE_2 },
      { label: "Heritage", image: IMAGE_4 },
      { label: "Signature Sets", image: IMAGE_3 },
    ],
  },
  {
    id: "latest-trends",
    label: "Latest Trends",
    childPanelMode: "both",
    subCategories: [
      "Layered Chains",
      "Ear Stacks",
      "Sculptural Silver",
      "Gemstone Color",
      "Bridal Edit",
      "Everyday Shine",
    ],
    ctaLabel: "Discover what's trending",
    featured: {
      image: FEATURED_IMAGE,
      title: "The edits everyone is wearing now",
      description:
        "Track the silhouettes, finishes, and styling directions shaping the current Goyaz wardrobe.",
    },
    cards: [
      { label: "Ear Stacks", image: IMAGE_4 },
      { label: "Layered Chains", image: IMAGE_6 },
      { label: "Gemstones", image: IMAGE_2 },
      { label: "Everyday Shine", image: IMAGE_5 },
    ],
  },
  {
    id: "loyalty-program",
    label: "Loyalty Program",
    childPanelMode: "list-only",
    subCategories: [
      "Inner Circle Tiers",
      "Early Access",
      "Birthday Rewards",
      "Private Appointments",
      "Referral Benefits",
      "Care Services",
    ],
    ctaLabel: "Discover member benefits",
    featured: {
      image: FEATURED_IMAGE,
      title: "More reasons to stay in the Inner Circle",
      description:
        "Unlock private previews, concierge moments, and rewards that grow with every Goyaz purchase.",
    },
    cards: [],
  },
];

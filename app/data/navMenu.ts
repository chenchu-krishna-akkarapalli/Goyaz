export type NavMenuSubCategory = {
  label: string;
  href: string;
};

export type NavMenuCard = {
  label: string;
  image: string;
  href: string;
};

export type NavMenuFeatured = {
  image: string;
  title: string;
  description: string;
};

export type NavMenuSection = {
  id: string;
  label: string;
  href: string;
  childPanelMode: "both" | "list-only" | "cards-only";
  subCategories: NavMenuSubCategory[];
  ctaLabel: string;
  ctaHref: string;
  featured: NavMenuFeatured;
  cards: NavMenuCard[];
};

export const NAV_MENU_SECONDARY_LINKS: { label: string; href: string }[] = [
  { label: "About",         href: "#" },
  { label: "Contact",       href: "#" },
  { label: "Find a Store",  href: "#" },
  { label: "Customer Care", href: "#" },
];

export const NAV_MENU_ACCOUNT_LINKS: { label: string; href: string }[] = [
  { label: "Sign Up",  href: "#" },
  { label: "Wishlist", href: "#" },
];

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
    href: "/collections",
    childPanelMode: "both",
    subCategories: [
      { label: "Nakshi",       href: "/collections/nakshi" },
      { label: "Polki",        href: "/collections/polki" },
      { label: "Kundan",       href: "/collections/kundan" },
      { label: "Temple",       href: "/collections/temple" },
      { label: "Zari",         href: "/collections" },
      { label: "Modern Icons", href: "/collections" },
    ],
    ctaLabel: "Discover all collections",
    ctaHref: "/collections",
    featured: {
      image: FEATURED_IMAGE,
      title: "Every collection tells a different silver story",
      description:
        "Browse house signatures, occasion-led edits, and cultural inspirations that shape the Goyaz point of view.",
    },
    cards: [
      { label: "Nakshi", image: IMAGE_1, href: "/collections/nakshi" },
      { label: "Polki",  image: IMAGE_2, href: "/collections/polki" },
      { label: "Kundan", image: IMAGE_3, href: "/collections/kundan" },
      { label: "Temple", image: IMAGE_6, href: "/collections/temple" },
    ],
  },
  {
    id: "jewelry",
    label: "Jewelry",
    href: "/collections",
    childPanelMode: "cards-only",
    subCategories: [
      { label: "Rings",     href: "/collections" },
      { label: "Bracelets", href: "/collections" },
      { label: "Necklaces", href: "/collections" },
      { label: "Earrings",  href: "/collections" },
      { label: "Men",       href: "/collections" },
      { label: "Women",     href: "/collections" },
    ],
    ctaLabel: "Discover all jewels",
    ctaHref: "/collections",
    featured: {
      image: FEATURED_IMAGE,
      title: "India's Largest Premium Silver Destination",
      description:
        "Join the Goyaz Inner Circle. Get early access to new collections and exclusive bridal offers.",
    },
    cards: [
      { label: "Bracelet",  image: IMAGE_2, href: "/collections" },
      { label: "Rings",     image: IMAGE_3, href: "/collections" },
      { label: "Earrings",  image: IMAGE_4, href: "/collections" },
      { label: "Necklaces", image: IMAGE_5, href: "/collections" },
    ],
  },
  {
    id: "engagement-bridal",
    label: "Bridal",
    href: "/collections/bridal",
    childPanelMode: "both",
    subCategories: [
      { label: "Engagement Rings",   href: "/collections/bridal" },
      { label: "Bridal Sets",        href: "/collections/bridal" },
      { label: "Wedding Bands",      href: "/collections/bridal" },
      { label: "Mangalsutras",       href: "/collections/bridal" },
      { label: "Solitaires",         href: "/collections/bridal" },
      { label: "Bridesmaid Gifts",   href: "/collections/bridal" },
    ],
    ctaLabel: "Discover bridal jewels",
    ctaHref: "/collections/bridal",
    featured: {
      image: FEATURED_IMAGE,
      title: "Bridal silver that feels heirloom-worthy",
      description:
        "Explore statement-ready silhouettes for engagements, mehendi celebrations, pheras, and the first festivities after.",
    },
    cards: [
      { label: "Solitaires",    image: IMAGE_3, href: "/collections/bridal" },
      { label: "Wedding Bands", image: IMAGE_5, href: "/collections/bridal" },
      { label: "Bridal Sets",   image: IMAGE_2, href: "/collections/bridal" },
      { label: "Gifting",       image: IMAGE_6, href: "/collections/bridal" },
    ],
  },
  {
    id: "gifts",
    label: "Gifts",
    href: "/collections",
    childPanelMode: "cards-only",
    subCategories: [
      { label: "Under 5K",           href: "/collections" },
      { label: "Under 10K",          href: "/collections" },
      { label: "Festive Gifts",      href: "/collections" },
      { label: "Personalised Picks", href: "/collections" },
      { label: "Gift Cards",         href: "/collections" },
      { label: "Corporate Gifting",  href: "/collections" },
    ],
    ctaLabel: "Discover gifting edits",
    ctaHref: "/collections",
    featured: {
      image: FEATURED_IMAGE,
      title: "Meaningful gifting for every milestone",
      description:
        "Choose from signature silver keepsakes, occasion-ready edits, and thoughtful pieces that arrive beautifully boxed.",
    },
    cards: [
      { label: "Keepsakes",      image: IMAGE_1, href: "/collections" },
      { label: "Celebration",    image: IMAGE_4, href: "/collections" },
      { label: "Gift Sets",      image: IMAGE_2, href: "/collections" },
      { label: "Everyday Silver",image: IMAGE_6, href: "/collections" },
    ],
  },
  {
    id: "high-jewelry",
    label: "High Jewelry",
    href: "/collections",
    childPanelMode: "both",
    subCategories: [
      { label: "Statement Necklaces", href: "/collections" },
      { label: "Cocktail Rings",      href: "/collections" },
      { label: "Heritage Sets",       href: "/collections" },
      { label: "Collector Pieces",    href: "/collections" },
      { label: "Gemstone Stories",    href: "/collections" },
      { label: "Limited Editions",    href: "/collections" },
    ],
    ctaLabel: "Discover high jewelry",
    ctaHref: "/collections",
    featured: {
      image: FEATURED_IMAGE,
      title: "Crafted to command the room",
      description:
        "From gemstone-centered silhouettes to museum-inspired detail, this edit brings dramatic silver into focus.",
    },
    cards: [
      { label: "Collector Pieces", image: IMAGE_5, href: "/collections" },
      { label: "Gemstones",        image: IMAGE_2, href: "/collections" },
      { label: "Heritage",         image: IMAGE_4, href: "/collections" },
      { label: "Signature Sets",   image: IMAGE_3, href: "/collections" },
    ],
  },
  {
    id: "latest-trends",
    label: "Latest Trends",
    href: "/collections",
    childPanelMode: "both",
    subCategories: [
      { label: "Layered Chains",   href: "/collections" },
      { label: "Ear Stacks",       href: "/collections" },
      { label: "Sculptural Silver",href: "/collections" },
      { label: "Gemstone Color",   href: "/collections" },
      { label: "Bridal Edit",      href: "/collections/bridal" },
      { label: "Everyday Shine",   href: "/collections" },
    ],
    ctaLabel: "Discover what's trending",
    ctaHref: "/collections",
    featured: {
      image: FEATURED_IMAGE,
      title: "The edits everyone is wearing now",
      description:
        "Track the silhouettes, finishes, and styling directions shaping the current Goyaz wardrobe.",
    },
    cards: [
      { label: "Ear Stacks",     image: IMAGE_4, href: "/collections" },
      { label: "Layered Chains", image: IMAGE_6, href: "/collections" },
      { label: "Gemstones",      image: IMAGE_2, href: "/collections" },
      { label: "Everyday Shine", image: IMAGE_5, href: "/collections" },
    ],
  },
  {
    id: "loyalty-program",
    label: "Loyalty Program",
    href: "#",
    childPanelMode: "list-only",
    subCategories: [
      { label: "Inner Circle Tiers",   href: "#" },
      { label: "Early Access",         href: "#" },
      { label: "Birthday Rewards",     href: "#" },
      { label: "Private Appointments", href: "#" },
      { label: "Referral Benefits",    href: "#" },
      { label: "Care Services",        href: "#" },
    ],
    ctaLabel: "Discover member benefits",
    ctaHref: "#",
    featured: {
      image: FEATURED_IMAGE,
      title: "More reasons to stay in the Inner Circle",
      description:
        "Unlock private previews, concierge moments, and rewards that grow with every Goyaz purchase.",
    },
    cards: [],
  },
];

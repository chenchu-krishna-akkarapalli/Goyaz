export type ObsessionItem = {
  label: string;
  img: string;
  /** CSS object-position to focus the crop on a specific part of the image */
  objectPosition?: string;
  href: string | null;
};

export const CURRENT_OBSESSIONS: ObsessionItem[] = [
  {
    label: "Nakshi",
    img: "/images/sections/current-obsessions/frame32.avif",
    href: "/collections/nakshi",
  },
  {
    label: "Polki",
    img: "/images/sections/current-obsessions/frame37.avif",
    objectPosition: "center",
    href: "/collections/polki",
  },
  {
    label: "Kundan",
    img: "/images/sections/current-obsessions/frame38.avif",
    objectPosition: "center top",
    href: "/collections/kundan",
  },
  {
    label: "Gifting",
    img: "/images/sections/current-obsessions/frame39.avif",
    href: null,
  },
  {
    label: "Bridal",
    img: "/images/sections/current-obsessions/frame40.avif",
    objectPosition: "center",
    href: "/collections/bridal",
  },
  {
    label: "Temple",
    img: "/images/sections/current-obsessions/frame41.avif",
    href: "/collections/temple",
  },
];

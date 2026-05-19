export type SectionHeadingData = {
  left: string;
  right: string;
};

export const SECTION_HEADINGS = {
  brandStory: {
    left: "Brand Story",
    right: "Crafted with Legacy",
  },
  innerCircle: {
    left: "The Inner Circle",
    right: "Exclusive Access. Rare Pieces.",
  },
  currentObsessions: {
    left: "Current Obsessions",
    right: "Trending Now",
  },
  masterpiecesInSilver: {
    left: "Masterpieces in Silver",
    right: "Pure 92.5 Silver",
  },
  masterpiecesForEveryOccasion: {
    left: "Masterpieces for Every Occasion",
    right: "",
  },
  spottedInGoyaz: {
    left: "Spotted in Goyaz",
    right: "Real Stories. Real Style.",
  },
  ourSocial: {
    left: "Our Social",
    right: "Follow @Goyaz",
  },
} satisfies Record<string, SectionHeadingData>;

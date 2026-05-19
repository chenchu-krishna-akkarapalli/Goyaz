export const INNER_CIRCLE_FRAME47 = "/images/sections/inner-circle/frame47.avif";
export const INNER_CIRCLE_FRAME48 = "/images/sections/masterpieces/frame48.avif";
export const INNER_CIRCLE_FRAME49 = "/images/sections/inner-circle/frame49.avif";
export const INNER_CIRCLE_FRAME130 = "/images/sections/inner-circle/frame130.avif";
export const INNER_CIRCLE_FRAME60 = "/images/sections/inner-circle/frame60.avif";

// Panel 1 — frame47 (flipped green panel)
export const INNER_CIRCLE_HEADING_1 = "Your Circle. Your Silver. Your Status.";
export const INNER_CIRCLE_SUBHEADING_1 =
	"Become a founding member of India's most exclusive silver community — early access, private drops, and invitations only for the chosen few.";

// Panel 2 — frame130
export const INNER_CIRCLE_HEADING_2 = "Crafted for the Connoisseur";
export const INNER_CIRCLE_SUBHEADING_2 =
	"Join a select group who receive first access to hand-crafted silver masterpieces, behind-the-scenes stories, and artisan previews before anyone else.";

// Panel 3 — frame60 (full-width banner)
export const INNER_CIRCLE_HEADING_3 = "Not Everyone Gets In";
export const INNER_CIRCLE_SUBHEADING_3 =
	"The Goyaz Inner Circle is an invite-only world of rare silver, festive exclusives, and experiences designed for those who know the difference.";

export const INNER_CIRCLE_CTA_LABEL = "view all buzz";

export type InnerCircleCardData = {
	imageSrc: string;
	title: string;
	price: string;
};

export const INNER_CIRCLE_CARDS: InnerCircleCardData[] = [
	{
		imageSrc: INNER_CIRCLE_FRAME48,
		title: "Princess Flower Pendant",
		price: "INR 55,000/-",
	},
	{
		imageSrc: INNER_CIRCLE_FRAME49,
		title: "Royal Bloom Silver Pendant",
		price: "INR 48,000/-",
	},
	{
		imageSrc: INNER_CIRCLE_FRAME48,
		title: "Eterna Floral Charm",
		price: "INR 39,500/-",
	},
	{
		imageSrc: INNER_CIRCLE_FRAME49,
		title: "Moon Petal Statement Pendant",
		price: "INR 62,000/-",
	},
];

export const INNER_CIRCLE_SLIDER = {
	trackWidth: 283,
	thumbWidth: 43,
};

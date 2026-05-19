export interface MasterpieceProduct {
  id: string;
  title: string;
  price: string;
  image: string;
}

export const MASTERPIECES_IN_SILVER_ICON_LEFT = "/images/sections/masterpieces-in-silver/icon-left.svg";
export const MASTERPIECES_IN_SILVER_ICON_RIGHT = "/images/sections/masterpieces-in-silver/icon-right.svg";

export const MASTERPIECES_PRODUCTS: MasterpieceProduct[] = [
  {
    id: "prod_1",
    title: "Princess Flower Pendant With Diamonds",
    price: "₹ 55,000/-",
    image: "/images/sections/masterpieces-in-silver/rectangle3.avif",
  },
  {
    id: "prod_2",
    title: "Royal Nakshi Temple Necklace",
    price: "₹ 1,25,000/-",
    image: "/images/sections/masterpieces/frame30.avif",
  },
  {
    id: "prod_3",
    title: "Vintage Victorian Drop Earrings",
    price: "₹ 34,500/-",
    image: "/images/sections/masterpieces/frame31.avif",
  },
  {
    id: "prod_4",
    title: "Classic Polki Choker Set",
    price: "₹ 89,000/-",
    image: "/images/sections/masterpieces/frame48.avif",
  }
];

"use client";

import { ANIMATION_CLASSES } from "../../utils/animations";
import { useCart } from "../../utils/cart";

type MasterpieceWideCardProps = {
  id?: string;
  imageSrc: string;
  title: string;
  price: string;
};

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='640' viewBox='0 0 640 640'%3E%3Crect width='640' height='640' fill='%23f2f2f2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23777777' font-size='28' font-family='Arial'%3EImage unavailable%3C/text%3E%3C/svg%3E";

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#002f00" aria-hidden="true">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7.5 17h11v-2H7.76c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

export function MasterpieceWideCard({ id, imageSrc, title, price }: MasterpieceWideCardProps) {
  const { addItem } = useCart();
  const productId = id ?? `masterpiece-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className={`flex flex-col gap-[10px] items-center w-[300px] sm:w-[400px] lg:w-[670px] shrink-0 ${ANIMATION_CLASSES.hoverZoomBase}`}>
      <div className="border-[#083c30] border-[0.5px] border-solid h-[220px] sm:h-[270px] lg:h-[325px] relative rounded-[30px] w-full overflow-hidden">
        <img
          alt=""
          className={`absolute inset-0 object-cover w-full h-full rounded-[30px] ${ANIMATION_CLASSES.hoverZoomImg}`}
          src={imageSrc}
          loading="lazy"
          decoding="async"
          onError={(event) => {
            event.currentTarget.src = FALLBACK_IMAGE;
          }}
        />
        <button
          type="button"
          aria-label={`Add ${title} to cart`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem({ id: productId, title, price, imageSrc });
          }}
          className={`cart-bar-bg absolute bottom-0 left-0 right-0 h-[41px] flex items-center justify-center gap-[10px] rounded-bl-[30px] rounded-br-[30px] cursor-pointer ${ANIMATION_CLASSES.cartBarHidden} ${ANIMATION_CLASSES.cartBarReveal}`}
        >
          <CartIcon />
          <p className="font-sans text-[#002f00] text-brand-xs text-center whitespace-nowrap leading-[96.8%]">
            Add to Cart
          </p>
        </button>
      </div>
      <div className="font-sans flex flex-col gap-[10px] items-center text-black w-full">
        <p className="text-brand-base text-center uppercase leading-[96.8%]">{title}</p>
        <div className="flex gap-[5px] items-center text-brand-sm whitespace-nowrap">
          <span>starting from</span>
          <span>{price}</span>
        </div>
      </div>
    </div>
  );
}

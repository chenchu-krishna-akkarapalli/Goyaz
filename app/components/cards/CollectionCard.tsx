"use client";

import Link from "next/link";
import { ANIMATION_CLASSES } from "../../utils/animations";
import { useCart } from "../../utils/cart";

type CollectionCardProps = {
  id: string;
  imageSrc: string;
  title: string;
  price: string;
  wide?: boolean;
  category?: string;
};

const FALLBACK_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='640' viewBox='0 0 640 640'%3E%3Crect width='640' height='640' fill='%23f2f2f2'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23777777' font-size='28' font-family='Arial'%3EImage unavailable%3C/text%3E%3C/svg%3E";

function CartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#002f00" aria-hidden="true">
      <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96C5 16.1 6.1 17 7.5 17h11v-2H7.76c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63H19c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0023.5 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
    </svg>
  );
}

export function CollectionCard({ id, imageSrc, title, price, wide = false, category }: CollectionCardProps) {
  const cardW = wide ? "w-full lg:w-[670px]" : "w-full lg:w-[325px]";
  const { addItem } = useCart();

  const CardBody = (
    <div className={`flex flex-col items-start ${cardW} ${ANIMATION_CLASSES.hoverZoomBase}`}>
      {/* Image container */}
      <div className={`${wide ? "h-[160px] sm:h-[220px] lg:h-[325px]" : "aspect-square"} relative rounded-[16px] lg:rounded-[30px] w-full overflow-hidden`}>
        <img
          alt={title}
          className={`absolute inset-0 object-cover w-full h-full rounded-[16px] lg:rounded-[30px] ${ANIMATION_CLASSES.hoverZoomImg}`}
          src={imageSrc}
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
        />
        {/* Add to Cart bar:
            Mobile — always visible (opacity-100 translate-y-0)
            Desktop — hidden until group-hover */}
        <button
          type="button"
          aria-label={`Add ${title} to cart`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addItem({ id, title, price, imageSrc });
          }}
          className={`cart-bar-bg absolute bottom-0 left-0 right-0 h-[36px] lg:h-[41px] flex items-center justify-center gap-[8px] rounded-bl-[16px] rounded-br-[16px] lg:rounded-bl-[30px] lg:rounded-br-[30px] cursor-pointer
            opacity-100 translate-y-0
            lg:opacity-0 lg:translate-y-full lg:transition-[opacity,transform] lg:duration-[400ms] lg:ease-[cubic-bezier(0.16,1,0.3,1)] lg:will-change-[opacity,transform]
            lg:group-hover:opacity-100 lg:group-hover:translate-y-0`}
        >
          <CartIcon />
          <p className="font-sans text-[#002f00] text-[11px] lg:text-[12px] text-center whitespace-nowrap leading-none">
            Add to Cart
          </p>
        </button>
      </div>

      {/* Card info */}
      <div className="font-sans flex flex-col gap-[6px] lg:gap-[10px] items-center text-[#002f00] w-full py-[8px] lg:py-[10px] px-[8px] lg:px-[40px]">
        <p className="text-[11px] lg:text-[16px] text-center uppercase leading-[96.8%] w-full">{title}</p>
        <div className="flex gap-[4px] items-center text-[10px] lg:text-[14px] whitespace-nowrap opacity-70">
          <span>from</span>
          <span>{price}</span>
        </div>
      </div>
    </div>
  );

  if (category) {
    return (
      <Link href={`/collections/${category}/${id}`} className="block">
        {CardBody}
      </Link>
    );
  }

  return CardBody;
}

import type { MasterpieceProduct } from "../../data/masterpieces";
import { CollectionCard } from "../cards/CollectionCard";
import { ScrollRevealWrapper } from "../../utils/animations";

/**
 * UniformGrid — scannable list view shown when any filter is active.
 * Replaces the curated bento with a clean responsive grid:
 *   mobile: 2-col  •  sm: 3-col  •  lg: 4-col
 *
 * Wide cards lose their wide treatment here — every cell is a uniform
 * aspect-square so filtered results read cleanly top-to-bottom.
 */
export function UniformGrid({ products }: { products: MasterpieceProduct[] }) {
  return (
    <ScrollRevealWrapper variant="up" delay={0}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-5 w-full items-start">
        {products.map((p) => (
          <CollectionCard
            key={p.id}
            id={p.id}
            imageSrc={p.imageSrc}
            title={p.title}
            price={p.price}
            category={p.category.toLowerCase()}
            fluid
          />
        ))}
      </div>
    </ScrollRevealWrapper>
  );
}

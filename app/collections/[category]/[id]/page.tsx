import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MASTERPIECE_PRODUCTS } from "../../../data/masterpieces";
import { CollectionCard } from "../../../components/cards/CollectionCard";
import { PageHeader } from "../../../components/PageHeader";
import { ScrollRevealWrapper, StaggerRevealList } from "../../../utils/animations";

export async function generateStaticParams() {
  return MASTERPIECE_PRODUCTS.map((p) => ({
    category: p.category.toLowerCase(),
    id: p.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = MASTERPIECE_PRODUCTS.find((p) => p.id === id);
  if (!product) return {};
  return {
    title: `${product.title} | Goyaz`,
    description: `Shop the premium ${product.title} starting from ${product.price}.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;

  const product = MASTERPIECE_PRODUCTS.find(
    (p) => p.id === id && p.category.toLowerCase() === category
  );

  if (!product) {
    notFound();
  }

  const relatedProducts = MASTERPIECE_PRODUCTS.filter(
    (p) => p.category.toLowerCase() === category && p.id !== id && p.size === "normal"
  ).slice(0, 4);

  return (
    <main className="bg-white min-h-screen pt-[80px]">
      <PageHeader
        subtitle={product.category}
        title={product.title}
        rightSlot={
          <Link
            href={`/collections/${category}`}
            className="text-[16px] uppercase tracking-[0.28em] text-[#002f00] hover:opacity-70 transition-opacity"
            style={{ fontFamily: "'Futura PT', sans-serif" }}
          >
            View {product.category} Collection
          </Link>
        }
      />

      <div className="layout-container py-10">
        <div className="layout-inner">
          <div className="grid gap-10 lg:grid-cols-[670px_minmax(420px,1fr)] items-start">
            <ScrollRevealWrapper variant="scale" className="w-full">
              <div className="relative h-[670px] w-full overflow-hidden rounded-[30px] bg-[#f5f5f5]">
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 670px, 100vw"
                  priority
                />
              </div>
            </ScrollRevealWrapper>

            <div className="flex flex-col gap-10">
              <ScrollRevealWrapper variant="up" delay={100}>
                <div className="flex flex-col gap-5">
                  <p
                    className="text-[14px] uppercase tracking-[0.4em] text-[#002f00]/70"
                    style={{ fontFamily: "'Futura PT', sans-serif" }}
                  >
                    {product.category}
                  </p>
                  <h1
                    className="text-[48px] text-[#002f00] leading-[1.05]"
                    style={{ fontFamily: "'House of Montague', Georgia, serif" }}
                  >
                    {product.title}
                  </h1>
                  <p
                    className="text-[24px] text-[#002f00]/80 tracking-[0.01em]"
                    style={{ fontFamily: "'Futura PT', sans-serif" }}
                  >
                    {product.price}
                  </p>
                </div>
              </ScrollRevealWrapper>

              <ScrollRevealWrapper variant="fade" delay={200}>
                <div className="rounded-[30px] border border-[#002f00]/10 bg-[#ffffff] p-8 shadow-[0_28px_80px_rgba(0,0,0,0.08)]">
                  <p
                    className="text-[16px] text-[#0a0a0a]/80 leading-[1.75]"
                    style={{ fontFamily: "'Futura PT', sans-serif" }}
                  >
                    Immerse yourself in the timeless elegance of the Goyaz {product.category} collection.
                    This exquisite {product.title.toLowerCase()} is handcrafted by our master karigars in 92.5
                    sterling silver. With heritage motifs and a rich vintage finish, it becomes an heirloom
                    statement piece for your most treasured occasions.
                  </p>
                </div>
              </ScrollRevealWrapper>

              <ScrollRevealWrapper variant="up" delay={300}>
                <button
                  className="w-full max-w-[420px] h-[60px] bg-[#002f00] text-white uppercase tracking-widest text-[16px] rounded-[30px] hover:bg-[#013809] transition-colors duration-300"
                  style={{ fontFamily: "'Futura PT', sans-serif" }}
                >
                  Add to Cart
                </button>
              </ScrollRevealWrapper>

              <ScrollRevealWrapper variant="up" delay={400}>
                <div className="overflow-hidden rounded-[30px] border border-[#002f00]/10 bg-[#ffffff]">
                  {[
                    "Product Details",
                    "Shipping & Returns",
                    "Care Instructions",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between px-8 py-5 text-[16px] uppercase text-[#002f00] border-b border-[#002f00]/10 last:border-b-0 cursor-pointer"
                      style={{ fontFamily: "'Futura PT', sans-serif" }}
                    >
                      <span>{item}</span>
                      <span>+</span>
                    </div>
                  ))}
                </div>
              </ScrollRevealWrapper>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-28">
              <ScrollRevealWrapper variant="up">
                <h2
                  className="text-[40px] text-[#002f00] mb-12"
                  style={{ fontFamily: "'House of Montague', Georgia, serif" }}
                >
                  You May Also Like
                </h2>
              </ScrollRevealWrapper>

              <StaggerRevealList className="flex gap-5 flex-nowrap overflow-x-auto pb-8 snap-x no-scrollbar">
                {relatedProducts.map((p) => (
                  <div key={p.id} className="snap-start shrink-0">
                    <CollectionCard
                      id={p.id}
                      imageSrc={p.imageSrc}
                      title={p.title}
                      price={p.price}
                      category={p.category.toLowerCase()}
                      wide={false}
                    />
                  </div>
                ))}
              </StaggerRevealList>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

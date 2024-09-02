import { api } from '@/data/api';
import { Product } from "@/data/types/product";
import { Metadata } from 'next';
import Image from "next/image";

type PageProps = {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const response = await api('/products/featured')
  const products: { data: Product[] } = await response.json()

  return products.data.map(product => {
    return {
      slug: product.slug
    }
  })
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProduct(params.slug)

  return {
    title: product.title
  }
}

async function getProduct(slug: string): Promise<Product> {
  const response = await api(`/products/${slug}`, {
    next: {
      revalidate: 60 * 60
    }
  })

  const product = await response.json()

  return product
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProduct(params.slug)

  return (
    <div className="relative grid max-h-[860px] grid-cols-3">
      {/* image */}
      <div className="col-span-2 overflow-hidden">
        <Image
          src={product.image}
          alt="Product image"
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      {/* image info */}
      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">{product.title}
        </h1>

        <p className="mt-2 leading-relaxed text-zinc-400">
          {product.description}
        </p>

        {/* price container */}
        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5  font-semibold"
          >
            {product.price.toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0
            })}
          </span>
          <span className="text-sm text-zinc-400">
            Em 12x s/ juros de {(product.price / 12).toLocaleString('pt-br', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        {/* tamanho container */}
        <div className="mt-8 space-y-4">
          <span className="block font-semibold">Tamanhos</span>

          <div className="flex gap-2">
            <button
              type="button" className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              P
            </button>
            <button
              type="button" className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              M
            </button>
            <button
              type="button" className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              G
            </button>
            <button
              type="button" className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
            >
              GG
            </button>
          </div>
        </div>

        {/* cart */}
        <button
          type="button"
          className="mt-8 flex h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
        >
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  )
}
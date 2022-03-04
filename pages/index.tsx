import type { NextPage } from 'next'
import FloatingButton from '@components/floatingbutton';
import Item from '@components/product';
import Layout from '@components/layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Fav, Product } from '@prisma/client';

interface FavWithCount extends Fav {
  favs: number
}

interface ProductWithFavs extends Product {
  _count: FavWithCount;
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithFavs[]
}

const Home: NextPage = () => {
  const router = useRouter()

  const { data } = useSWR<ProductsResponse>('/api/products');

  const { status } = useSession({
    required: true,
    onUnauthenticated () {
      router.replace('/enter')
    }
  })

  return (
    <Layout title='홈' hasTabBar>
      <div className='flex flex-col space-y-5 divide-y'>
        {data?.products?.map((product) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            comments={1}
            hearts={product._count.favs}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>

    </Layout>
  );
}

export default Home

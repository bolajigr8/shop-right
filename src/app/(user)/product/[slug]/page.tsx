import ProudctInfo from '@/components/ProudctInfo'
import Container from '@/components/Container'
import Onsale from '@/components/Onsale'
import { client, urlFor } from '@/lib/sanityClient'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { ProductProps } from '../../../../../type' // Ensure this interface exists and is correct
import { PortableText } from '@portabletext/react'
import { RichText } from '@/components/RichText'

interface Props {
  params: {
    slug: string
  }
}

// Fix generateStaticParams type and ensure it returns the correct data
export const generateStaticParams = async (): Promise<
  { params: { slug: string } }[]
> => {
  const query = groq`*[_type == 'product']{
    slug
  }`

  const slugs: { slug: { current: string } }[] = await client.fetch(query)
  return slugs.map((slug) => ({
    params: { slug: slug?.slug?.current },
  }))
}

const specialOffersQuery = groq`*[_type == 'product' && position == 'on Sale']{
    ...
} | order(_createdAt asc)`

// Single product page component
const SinglePage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'product' && slug.current == $slug][0]{
    ...
  }`

  const product: ProductProps = await client.fetch(query, { slug })
  const specialOffersProduct = await client.fetch(specialOffersQuery)

  return (
    <Container className='my-10'>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-4 h-full -mt-5 xl:-mt-8 bg-gray-100 p-4'>
        <div>
          <Onsale products={specialOffersProduct} />
        </div>
        <div className='h-full xl:col-span-2'>
          <Image
            src={urlFor(product?.image).url()}
            alt='product image'
            className='w-full h-full object-contain'
            width={500}
            height={500}
          />
        </div>
        <div className='w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-6 justify-center'>
          <ProudctInfo product={product} /> {/* Fixed typo here */}
        </div>
      </div>
      <PortableText value={product?.body} components={RichText} />
    </Container>
  )
}

export default SinglePage

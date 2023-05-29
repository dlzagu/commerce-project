import getCategories from './actions/getCategories'
import getTrendingProducts from './actions/getTrendingProducts'
import ClientOnly from './components/ClientOnly'
import Container from './components/Container'
import CategoryPreviews from './components/category/CategoryPreviews'
import TrendingProducts from './components/products/TrendingProducts'

const Home = async () => {
  const categories = await getCategories()
  const products = await getTrendingProducts()
  return (
    <ClientOnly>
      <Container>
        <CategoryPreviews categories={categories} />
        <TrendingProducts products={products} />
      </Container>
    </ClientOnly>
  )
}

export default Home

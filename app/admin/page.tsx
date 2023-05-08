import EmptyState from '@/app/components/EmptyState'
import ClientOnly from '@/app/components/ClientOnly'
import AdminClient from './adminClient'
import getCurrentUser from '../actions/getCurrentUser'
import getProducts from '../actions/getProucts'
import getCategories from '../actions/getCategories'

const AdminPage = async () => {
  const currentUser = await getCurrentUser()
  const products = await getProducts()
  const categories = await getCategories()
  //   if (listings.length === 0) {
  //     return (
  //       <ClientOnly>
  //         <EmptyState title="상품이 없습니다" subtitle="상품을 등록해주세요." />
  //       </ClientOnly>
  //     )
  //   }

  return (
    <ClientOnly>
      <AdminClient
        currentUser={currentUser}
        products={products}
        categories={categories}
      />
    </ClientOnly>
  )
}

export default AdminPage

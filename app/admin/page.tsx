import EmptyState from '@/app/components/EmptyState'
import ClientOnly from '@/app/components/ClientOnly'
import AdminClient from './adminClient'
import getCurrentUser from '../actions/getCurrentUser'
import getProducts, { IProductsParams } from '../actions/getProucts'
import getCategories from '../actions/getCategories'

interface IParams {
  searchParams: IProductsParams
}

const AdminPage = async ({ searchParams }: IParams) => {
  const currentUser = await getCurrentUser()
  const products = await getProducts(searchParams)
  const categories = await getCategories()
  if (currentUser?.userType !== 'Admin') {
    return (
      <ClientOnly>
        <EmptyState
          title="관리자가 아닙니다."
          subtitle="관리자 등록을 해주세요."
        />
      </ClientOnly>
    )
  }

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

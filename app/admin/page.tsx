import EmptyState from '@/app/components/EmptyState'
import ClientOnly from '@/app/components/ClientOnly'
import AdminClient from './adminClient'

const AdminPage = async () => {
  //   if (listings.length === 0) {
  //     return (
  //       <ClientOnly>
  //         <EmptyState title="상품이 없습니다" subtitle="상품을 등록해주세요." />
  //       </ClientOnly>
  //     )
  //   }

  return (
    <ClientOnly>
      <AdminClient />
    </ClientOnly>
  )
}

export default AdminPage

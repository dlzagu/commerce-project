# 💍 Nextjs 13 E-commerce Project (Brand Zhuro)

<br />

## 👉 E-commerce 구경하기

</br>

- https://zhuro-commerce.vercel.app/

<br />

## 📃 개요

</br>

- 서비스명 : zhuro (주얼리 brand Ecommerce)
- 개발 기간 : 2023.05.03 ~ 2023.05.28
- 주제 : 웹 쇼핑몰 서비스
- 개발 인원 : 1인 사이드 프로젝트

<br />

## 🚀 프로젝트 간단 소개

</br>

### **창업했던 아이템을 활용한 쇼핑몰 프로젝트**

- 대학교 시절 창업동아리를 통해 주얼리 브랜드를 운영한 경험이 있는데, 나만의 디자인으로 새롭게 웹사이트를 제작해보았습니다.
- NextJs를 사용하여 서버를 간편하게 구축했고, Vercel의 서버리스 장점을 살려 쉽게 배포하여 관리하고 있습니다.
- 프로젝트 주 기능으로는 로그인, 상품관리, 카테고리관리, 장바구니, 주문목록, 주문현황, 상품필터, 상품검색 등 이 있습니다.

  </br>

## 🔧 기술 스택

</br>

<div>

<img src="https://img.shields.io/badge/Nextjs-000000?style=flat-square&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/NextAuth-000000?style=flat-square&logo=nextdotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Typescript-262627?style=flat-square&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
<br />

<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/Zustand-FAB040?style=flat-square&logo=Zustand&logoColor=white"/>
<img src="https://img.shields.io/badge/React Hook Form-EC5990?style=flat-square&logo=React Hook Form&logoColor=white"/>
<br />

<img src="https://img.shields.io/badge/Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white"/>
<img src="https://img.shields.io/badge/Mongodb-47A248?style=flat-square&logo=mongodb&logoColor=white"/>

</div>

<br />

<br />

<br />

## 🛠 주요 기능 Check

<br />

### **✅ 로그인, 회원가입**

- Nextjs와 원활하게 통합되며, 커스터마이즈 및 확장이 용이한 NextAuth를 사용하여 카카오, 구글, 깃허브와 같은 소셜 로그인 기능을 구현했습니다.
- NextAuth와 getServerSession를 함께 사용하여 더욱 강력한 인증 시스템을 구축하고 사용자의 인증 및 세션 관리를 더욱 효율적으로 했습니다.
- Zustand를 이용해 모달의 상태를 전역으로 관리했습니다. 이로 인해 로그인 모달을 어느 페이지에서든 사용자들이 항상 접근 하기 쉽게 했습니다.
  <br />

### **✅ Admin 페이지**

**검색**

- 검색 기능을 통해 원하는 상품을 간편하게 검색하여 수정 및 삭제 할 수 있습니다.
- 검색어 입력란에 값을 입력할 때마다 API를 호출하여 실시간으로 검색 결과를 업데이트 했습니다.
- router.push를 사용하여 페이지를 리로드했습니다. 이를 통해 브라우저의 뒤로 가기 및 앞으로 가기 버튼을 사용하여 이전 검색 결과를 다시 볼 수 있습니다.

**카테고리 관리**

- 모달 형태의 사용자 인터페이스: 모달을 사용하여 카테고리 생성 및 삭제 기능을 구현했습니다.
- 사용자가 현재 페이지에서 다른 작업을 중단하지 않고도 카테고리 관리 작업을 수행할 수 있게 했습니다.
- react-hook-form을 사용하여 간편한 상태관리와 유효성 검사를 함으로써 효율적인 폼을 구현했습니다.

**상품 생성 및 수정 삭제**

- 구조화된 코드: 단계별로 상품 생성 프로세스를 구성하여 각 단계마다 해당하는 내용을 보여주고, 사용자 입력을 받아서 상태를 업데이트합니다. 코드를 구조화 하여 코드의 가독성을 높이고 유지보수를 용이하게 했습니다.
- Modal, SelectInput, ImageUpload, Input, Heading 등의 재사용 가능한 컴포넌트를 사용하여 UI를 구성했습니다. 이를 통해 코드의 재사용성을 높이고, 개발 속도를 향상시켰습니다.
- useState 훅을 사용하여 로딩 상태(isLoading)와 단계 상태(step)를 관리하고 있습니다. 이를 통해 상태 변화에 따라 적절한 UI를 보여주고, 사용자의 상호작용에 따라 상품 생성 단계를 전환했습니다.
- 효과적인 UI 플로우: 단계별로 UI를 보여주고, 사용자의 입력을 기다리는 방식으로 효과적인 UI 플로우를 구성했습니다. 각 단계에서 필요한 정보를 입력받고, 다음 단계로 진행할 수 있는 버튼을 제공하여 사용자가 진행하는 과정을 명확하게 안내했습니다.

<br />

### **✅ Products 페이지**

- 상품 필터링 기능: 카테고리와 크기에 따라 상품을 필터링할 수 있으며, 선택된 필터링 옵션에 따라 상품 목록이 업데이트됩니다. 이를 통해 사용자는 원하는 조건에 맞는 상품들만을 볼 수 있습니다.
- 페이지네이션: 페이지네이션 버튼을 통해 다음 페이지로 이동할 수 있으며, 상품이 한 페이지에 나열되는 수를 제한할 수 있습니다. 이를 통해 사용자는 여러 페이지에 걸쳐 상품을 탐색할 수 있습니다.
- 필터링 옵션과 정렬 옵션의 변경에 따라 상태가 업데이트되고, 업데이트된 상태에 따라 상품 목록이 동적으로 렌더링됩니다. 이를 통해 사용자와의 상호작용이 원활하게 이루어집니다.
- 필터 옵션은 URL의 쿼리 파라미터로 저장되므로, 사용자가 페이지를 새로 고침하거나 다른 상품 목록 페이지로 이동한 후에도 이전 필터 옵션을 유지할 수 있습니다. 이는 사용자가 원하는 필터링 옵션을 계속 사용할 수 있게 합니다.

<br />

### **✅ Products/[ProductId] 페이지**

- 상품상세 페이지로 상품의 여러 이미지들을 미리 볼 수 있으며 사진들을 탭으로 전환하여 각 사진을 더욱 자세히 볼 수 있습니다.
- 재고가 있는 사이즈를 선택할 수 있으며, 장바구니에 담을 수 있습니다. 추가로 사이즈 가이드 및 배송 정보 등 다양한 상품 정보에 대한 세부 사항을 접기/펼치기를 탭을 통해 확인할 수 있습니다. 이를 통해 사용자는 필요한 경우 세부 사항을 확인하고, 필요하지 않은 경우에는 접힌 상태로 유지할 수 있습니다.
- 좋아요 상태를 표시해주고 좋아요 취소 및 좋아요 누르기가 가능합니다. 좋아요한 상품은 likes 목록에서 확인 가능합니다.

  <br />

### **✅ Search bar 기능**

- 검색 기능은 많은 웹 사이트에서 핵심 기능 중 하나이므로 Navbar에 위치시켜 어느 페이지에서든 사용자들이 항상 접근 하기 쉽게 하여 사용자 경험을 향상시키고 편의성을 제공했습니다.
- 시각적인 측면에서 사용자가 검색 창을 토글할 수 있고, 검색 창이 열렸을 때는 유저 인터페이스에 검색 입력 필드와 닫기 버튼이 나타납니다.
- 검색어 입력 후 submit 시에 qs 라이브러리를 사용하여 URL에 검색어를 포함한 쿼리 파라미터를 생성합니다. 이를 통해 검색 결과를 유지하면서 페이지를 공유하거나 뒤로 가기/앞으로 가기를 할 수 있습니다.

  <br />

### **✅ ProductSearch 페이지**

- 검색 결과를 보여주고, 필터링 옵션을 제공합니다. 검색 결과, 필터 선택, 정렬, 페이지네이션 등을 제공합니다.
- useSearchParams와 useRouter를 이용하여 URL의 쿼리 파라미터를 처리하고, 검색 결과 페이지에 필요한 정보를 유지합니다.
- 검색 결과가 없을 때, 사용자에게 검색 결과가 없다는 정보를 명확하게 전달함으로써, 사용자는 더 나은 검색 결과를 얻기 위해 검색어를 수정하거나 다른 필터를 적용할 수 있습니다.

  <br />

### **✅ Cart 페이지**

- 장바구니의 담은 상품 목록과 정보들을 볼 수 있으며 해당 상품을 클릭하면 디테일 페이지로 이동합니다. 또 결제해야 될 금액과 배송료 등을 확인 할 수 있습니다.
- 로컬 상태 관리: zustand의 persist 미들웨어를 사용하여 cartItems 상태를 로컬 저장소에 보관할 수 있습니다. 이를 통해 사용자가 페이지를 새로 고침하거나 브라우저를 닫았다가 다시 열어도 장바구니 상태가 유지되게 하여 사용자 경험을 향상시켰습니다.
- 로그인 상태와 관계없이 장바구니 기능을 사용할 수 있도록 구현했습니다. 사용자가 로그인하지 않았더라도 장바구니에 상품을 추가하고 삭제할 수 있습니다. 이는 사용자에게 장바구니 기능의 제약을 없애고, 로그인 전후에도 일관된 사용자 경험을 제공하는 장점을 가지고 있습니다. (결제시 로그인 모달 창 띄움)

  <br />

### **✅ Checkout 페이지**

- 로그인 상태 체크: currentUser 상태를 확인하여 사용자가 로그인되어 있는지 확인합니다. 만약 로그인되어 있지 않다면 useLoginModal을 사용하여 로그인 모달을 열도록 했습니다.
- react-hook-form을 사용하여 폼을 관리합니다. register 함수를 통해 필드를 등록하고, handleSubmit 함수를 통해 폼 제출을 처리합니다. react-hook-form이 제공하는 기능을 사용하여 폼의 유효성 검사와 에러 처리를 간편하게 처리했습니다.
- 결제 처리: 폼 데이터와 장바구니 상품 목록을 함께 서버에 전송하여 결제 처리를 수행합니다. 이때, 장바구니 상품 목록은 cartItems 상태를 활용하여 가져올 수 있습니다. 결제가 성공하면 성공 메시지를 토스트로 보여주고, 주문 페이지로 이동한 후 장바구니를 비우고 폼을 초기화합니다.
- 사용자 경험 개선: 상품이 장바구니에 없을 경우에는 빈 상태를 나타내는 EmptyState 컴포넌트를 렌더링하여 사용자에게 알립니다. 이를 통해 사용자에게 결제할 상품이 없다는 정보를 제공하여 명확한 사용자 경험을 제공합니다.

  <br />

### **✅ Orders 페이지**

- 지난 주문 목록과 주문 정보 등을 확인 할 수 있습니다.
- 주문 정보의 일부를 숨기는 스타일링을 통해 UI를 간소화하고 사용자의 주목을 필요한 정보에 집중시켰습니다.
- 클릭 이벤트를 처리하여 주문 세부 정보 페이지로의 네비게이션을 지원합니다.

  <br />

### **✅ Orders/[orderId] 페이지**

- 주문 고객의 주문 정보를 표시하는 주문 상세 화면을 나타냅니다. 주문 번호, 주문일, 상품 목록 및 결제 정보 등 주문에 관련된 정보를 보여줍니다.
- 주문의 결제 정보를 나타냅니다. 청구 주소, 결제 정보, 주문 총액 등을 표시합니다.

<br />

### **✅ 반응형 디자인**

- 반응형 디자인을 적용하여 다양한 화면 크기에서도 일관된 사용자 경험을 제공합니다.

  <br />

### **✅ 에러처리**

- Next.js 13에서 제공하는 전역 에러 핸들러를 이용하여, 애플리케이션 전역에서 발생하는 예외를 처리했습니다.

  <br />

### **✅ LoadingUI**

- Next.js 13은 React Suspense 와 함께하는 의미있는 로딩 UI를 만들 수 있도록 loading.js를 제공하는데 이를 통해 컨텐츠가 서버로부터 로드 되는동안 즉시 loading 상태를 보여주었고, 새로운 콘텐츠는 렌더링이 끝나면 자동으로 교체되게 했습니다.

<br />

<br />

## 🔍 테스트 방법

<br />

### Install packages

```shell
npm i

or

yarn
```

### Setup .env file

```js
DATABASE_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_SECRET=
```

### Setup Prisma

```shell
npx prisma db push

```

### Start the app

```shell
npm run dev

or

yarn dev
```

<br />

<br />

## 📁 프로젝트 구조

```
 📦commerce
 ┃ 📦app
 ┃ ┣ 📂actions
 ┃ ┃ ┣ 📜getCategories.ts
 ┃ ┃ ┣ 📜getCurrentUser.ts
 ┃ ┃ ┣ 📜getFavoriteProducts.ts
 ┃ ┃ ┣ 📜getOrderById.ts
 ┃ ┃ ┣ 📜getOrderItemsById.ts
 ┃ ┃ ┣ 📜getOrders.ts
 ┃ ┃ ┣ 📜getProductById.ts
 ┃ ┃ ┣ 📜getProucts.ts
 ┃ ┃ ┗ 📜getTrendingProducts.ts
 ┃ ┣ 📂admin
 ┃ ┃ ┣ 📜adminClient.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂categories
 ┃ ┃ ┃ ┣ 📂[categoryId]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂favorites
 ┃ ┃ ┃ ┗ 📂[productId]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂order
 ┃ ┃ ┃ ┣ 📂[orderId]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂products
 ┃ ┃ ┃ ┣ 📂[productId]
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┗ 📂register
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂cart
 ┃ ┃ ┣ 📜CartsClient.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂checkout
 ┃ ┃ ┣ 📜CheckoutClient.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂cart
 ┃ ┃ ┃ ┣ 📜CartItemCard.tsx
 ┃ ┃ ┃ ┗ 📜CartOderSummary.tsx
 ┃ ┃ ┣ 📂category
 ┃ ┃ ┃ ┣ 📜CategoryInfo.tsx
 ┃ ┃ ┃ ┗ 📜CategoryPreviews.tsx
 ┃ ┃ ┣ 📂footer
 ┃ ┃ ┃ ┗ 📜Footer.tsx
 ┃ ┃ ┣ 📂inputs
 ┃ ┃ ┃ ┣ 📜CheckoutInput.tsx
 ┃ ┃ ┃ ┣ 📜Counter.tsx
 ┃ ┃ ┃ ┣ 📜ImageUpload.tsx
 ┃ ┃ ┃ ┣ 📜Input.tsx
 ┃ ┃ ┃ ┗ 📜SelectInput.tsx
 ┃ ┃ ┣ 📂modals
 ┃ ┃ ┃ ┣ 📜CategoryAddModal.tsx
 ┃ ┃ ┃ ┣ 📜LoginModal.tsx
 ┃ ┃ ┃ ┣ 📜ProductAddModal.tsx
 ┃ ┃ ┃ ┣ 📜ProductEditModal.tsx
 ┃ ┃ ┃ ┣ 📜RegisterModal.tsx
 ┃ ┃ ┃ ┗ 📜SizeGuideModal.tsx
 ┃ ┃ ┣ 📂navbar
 ┃ ┃ ┃ ┣ 📜Cart.tsx
 ┃ ┃ ┃ ┣ 📜Logo.tsx
 ┃ ┃ ┃ ┣ 📜MenuItem.tsx
 ┃ ┃ ┃ ┣ 📜Navbar.tsx
 ┃ ┃ ┃ ┣ 📜Search.tsx
 ┃ ┃ ┃ ┗ 📜UserMenu.tsx
 ┃ ┃ ┣ 📂order
 ┃ ┃ ┃ ┣ 📜CheckoutForm.tsx
 ┃ ┃ ┃ ┣ 📜OrderHistoryInfo.tsx
 ┃ ┃ ┃ ┣ 📜OrderHistoryItemInfo.tsx
 ┃ ┃ ┃ ┣ 📜OrderItemCard.tsx
 ┃ ┃ ┃ ┣ 📜OrderItemsBilling.tsx
 ┃ ┃ ┃ ┗ 📜OrderSummary.tsx
 ┃ ┃ ┣ 📂products
 ┃ ┃ ┃ ┣ 📜Gallery.tsx
 ┃ ┃ ┃ ┣ 📜ProductCard.tsx
 ┃ ┃ ┃ ┣ 📜ProductFilter.tsx
 ┃ ┃ ┃ ┣ 📜ProductInfo.tsx
 ┃ ┃ ┃ ┗ 📜TrendingProducts.tsx
 ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┗ 📜SearchForm.tsx
 ┃ ┃ ┣ 📂ui
 ┃ ┃ ┃ ┗ 📜Button.tsx
 ┃ ┃ ┣ 📜Avatar.tsx
 ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┣ 📜ClientOnly.tsx
 ┃ ┃ ┣ 📜Container.tsx
 ┃ ┃ ┣ 📜EmptyState.tsx
 ┃ ┃ ┣ 📜Heading.tsx
 ┃ ┃ ┣ 📜HeartButton.tsx
 ┃ ┃ ┣ 📜Loader.tsx
 ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┗ 📜PaginationButtons.tsx
 ┃ ┣ 📂favorites
 ┃ ┃ ┣ 📜FavoritesClient.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂helpers
 ┃ ┃ ┗ 📜date.ts
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜useCartItem.ts
 ┃ ┃ ┣ 📜useCategoryAddModal.ts
 ┃ ┃ ┣ 📜useFavorite.ts
 ┃ ┃ ┣ 📜useLoginModal.ts
 ┃ ┃ ┣ 📜useProductAddModal.ts
 ┃ ┃ ┣ 📜useProductEditModal.ts
 ┃ ┃ ┗ 📜useRegisterModal.ts
 ┃ ┣ 📂libs
 ┃ ┃ ┗ 📜prismadb.ts
 ┃ ┣ 📂orders
 ┃ ┃ ┣ 📂[orderId]
 ┃ ┃ ┃ ┣ 📜OrderClient.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜OrdersClient.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂products
 ┃ ┃ ┣ 📂[productId]
 ┃ ┃ ┃ ┣ 📜ProductClient.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📜ProductsClient.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂productsSearch
 ┃ ┃ ┣ 📜ProductsSearchClient.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂providers
 ┃ ┃ ┗ 📜ToasterProvider.tsx
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📜constants.ts
 ┃ ┣ 📜error.tsx
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜globals.css
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜loading.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📦pages
 ┃ ┗ 📂api
 ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┗ 📜[...nextauth].ts
 ┃ 📦prisma
 ┃ ┗ 📜schema.prisma
 ┣ 📦public
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜logo.png
 ┃ ┃ ┣ 📜placeholder.jpg
 ┃ ┃ ┗ 📜sizeGuide.png
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜next.svg
 ┃ ┣ 📜thirteen.svg
 ┃ ┗ 📜vercel.svg
 ┣ 📜.env
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierignore
 ┣ 📜.prettierrc
 ┣ 📜README.md
 ┣ 📜next-env.d.ts
 ┣ 📜next.config.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.js
 ┣ 📜tailwind.config.js
 ┣ 📜tsconfig.json
 ┣ 📜yarn-error.log
 ┗ 📜yarn.lock
```

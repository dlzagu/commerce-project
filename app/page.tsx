import ClientOnly from './components/ClientOnly'
import Container from './components/Container'

const Home = async () => {
  return (
    <ClientOnly>
      <Container>hello</Container>
    </ClientOnly>
  )
}

export default Home

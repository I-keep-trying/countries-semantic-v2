import React from 'react'
import { Container } from 'semantic-ui-react'
import Footer from './components/Footer'
import Countries from './pages/Countries2'

const App = () => {
  return (
    <>
      <Countries />
      <Container fluid>
        <Footer />
      </Container>
    </>
  )
}

export default App

import React from 'react'
import { Container } from 'semantic-ui-react'
import Footer from './components/Footer'
import Countries from './pages/Countries'
import CountriesMobile from './pages/CountriesMobile'
import { isMobile } from 'react-device-detect'

const App = () => {
  return (
    <>
      {isMobile ? <CountriesMobile /> : <Countries />}
      <Container fluid>
        <Footer />
      </Container>
    </>
  )
}

export default App

import React, { useState } from 'react'
import { isMobile } from 'react-device-detect'
import axios from 'axios'
import {
  Container,
  Button,
  Image,
  Menu,
  Grid,
  Table,
  Message,
} from 'semantic-ui-react'
import Country from './Country'
import HeaderNav from '../components/Header'
import countriesApiData from '../all-countries'
import countriesBasicInfo from '../countriesList'
import regions from '../regions'

const Countries = () => {
  const [input, setInput] = useState('')
  const [activeRegion, setActiveRegion] = useState('All')
  const [activeSubregion, setActiveSubregion] = useState('')
  const [region, setRegion] = useState('All')
  const [subregion, setSubRegion] = useState('')
  const [, setCountry] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // get static lists of regions & subregions for labels on tabs
  const getSubregions = regions.filter((r) => {
    return r.region === activeRegion ? r : ''
  })

  const filteredCountries = countriesBasicInfo.filter((c) => {
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

  const filterByRegion =
    region === 'All'
      ? filteredCountries
      : filteredCountries.filter(
          (c) => c.region.toLowerCase() === region.toLowerCase()
        )

  const filterBySubregion =
    subregion === ''
      ? filterByRegion
      : filterByRegion.filter((r) => r.subregion === subregion)

  const getCountryData = countriesApiData.filter((c) => {
    return c.name.toLowerCase().startsWith(input.toLowerCase())
  })

  // handle click of "Details" button
  const handleClick = (c) => {
    // pass full country details from api data
    const countryData = getCountryData.filter((cd) => {
      return cd.name.toLowerCase().startsWith(c.name.toLowerCase())
    })
    setIsLoading(true)
    setCountry(countryData[0].name)
    setInput(c.name)
  }

  // handle click of a region tab
  const handleRegionClick = (e, { name }) => {
    setCountry(null)
    setSubRegion('')
    setActiveSubregion('')
    setRegion(name)
    setActiveRegion(name)
  }

  // handle click of a subregion tab
  const handleSubregionClick = (e, { name }) => {
    setCountry(null)
    setSubRegion(name)
    setActiveSubregion(name)
  }

  // when input returns no match
  const reset = () => {
    setCountry(null)
    setInput('')
    setRegion('All')
    setActiveRegion('All')
    setSubRegion('')
    setActiveSubregion('')
  }

  const NoMatches = () => (
    <Container>
      <Message compact info>
        <Message.Header>No matches, please try again.</Message.Header>
        <Button basic color="teal" onClick={reset}>
          OK
        </Button>
      </Message>
    </Container>
  )

  const CountriesTable = () => (
    <>
      <Table selectable stackable>
        <Table.Body>
          {filterBySubregion.map((c) => {
            return (
              <>
                <Table.Row onClick={() => handleClick(c)}>
                  <Table.Cell width="two">
                    <Image
                      size="tiny"
                      src={c.flag}
                      alt="country flag"
                      bordered
                    />
                  </Table.Cell>
                  <Table.Cell>{c.name}</Table.Cell>
                </Table.Row>
              </>
            )
          })}
        </Table.Body>
      </Table>
    </>
  )

  return (
    <>
      <HeaderNav
        input={input}
        setInput={setInput}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        countries={filterBySubregion}
        setRegion={setRegion}
        setSubRegion={setSubRegion}
        setActiveRegion={setActiveRegion}
        setActiveSubregion={setActiveSubregion}
      />

      {getCountryData.length === 1 ? (
        <>
          <Country
            flag={filterBySubregion[0].flag}
            reset={reset}
            setInput={setInput}
            setRegion={setRegion}
            isLoading={isLoading}
            country={getCountryData[0]}
            setCountry={setCountry}
            region={region}
            subregion={subregion}
            setSubRegion={setSubRegion}
            setIsLoading={setIsLoading}
            setActiveRegion={setActiveRegion}
            setActiveSubregion={setActiveSubregion}
          />
        </>
      ) : (
        <>
          <Container
            style={
              filterBySubregion.length < 250
                ? { marginTop: 96 }
                : { marginTop: 66 }
            }
            fluid
          >
            <Grid>
              {getSubregions[0].subregions.length > 0 ? (
                <>
                  <Grid.Row style={{ margin: 0, padding: 0 }}>
                    <Menu fixed="top" style={{ marginTop: 54 }} widths={8}>
                      {regions.map((r) => {
                        return (
                          <Menu.Item
                            key={r.id}
                            name={r.region}
                            active={activeRegion === r.region}
                            onClick={handleRegionClick}
                          />
                        )
                      })}
                    </Menu>
                    <Menu
                      fixed="top"
                      style={{ marginTop: 95 }}
                      widths={getSubregions[0].subregions.length}
                    >
                      {getSubregions[0].subregions.map((rs) => (
                        <Menu.Item
                          key={rs}
                          name={rs}
                          active={activeSubregion === rs}
                          onClick={handleSubregionClick}
                        />
                      ))}
                    </Menu>
                  </Grid.Row>
                </>
              ) : (
                <>
                  <Grid.Row style={{ margin: 0, padding: 0 }}>
                    <Menu fixed="top" style={{ marginTop: 54 }} widths={8}>
                      {regions.map((r) => (
                        <Menu.Item
                          key={r.id}
                          name={r.region}
                          active={activeRegion === r.region}
                          onClick={handleRegionClick}
                        />
                      ))}
                    </Menu>
                  </Grid.Row>
                </>
              )}
            </Grid>
            {filterBySubregion.length === 0 ? (
              <NoMatches />
            ) : (
              <CountriesTable />
            )}
          </Container>
        </>
      )}
    </>
  )
}

export default Countries

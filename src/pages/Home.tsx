import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Search } from '../components/search/Search'
import { Preloader } from '../components/preloader/Preloader'
import { CountriesList } from '../components/countries/CountriesList'

import { fetchCountries } from '../redux/slices/countriesSlice'

import {
  selectRegionFilter,
  selectSearchFilter,
  selectSortModeFilter,
} from '../redux/slices/filterSlice'

import {
  selectCountries,
  selectIsLoading,
} from '../redux/selectors/countries-selectors'

export const Home: FC = () => {
  const dispatch = useDispatch()
  const countries = useSelector(selectCountries)
  const [filteredCountries, setFilteredCountries] = useState(countries)
  const isLoading = useSelector(selectIsLoading)
  const search = useSelector(selectSearchFilter)
  const region = useSelector(selectRegionFilter)
  const sortMode = useSelector(selectSortModeFilter)

  useEffect(() => {
    if (!countries.length) {
      dispatch(fetchCountries())
    }
  }, [])

  const handleSearch = (search: string, region: string, sortMode: string) => {
    let data = [...countries]

    if (search) {
      data = data.filter((item) => RegExp(search, 'i').test(item.name.common))
    }

    if (region) {
      data = data.filter((item) => item.region.includes(region))
    }

    if (sortMode) {
      data = data.toSorted((a, b) => {
        if (sortMode === 'asc' && a.name.common > b.name.common) return 1
        else if (sortMode === 'asc') return -1
        else if (sortMode === 'desc' && a.name.common < b.name.common) return 1
        else return -1
      })
    }

    setFilteredCountries(data)
  }

  useEffect(() => {
    handleSearch(search, region, sortMode)
  }, [countries])

  return (
    <>
      <Search onSearch={handleSearch} />

      {isLoading ? (
        <Preloader />
      ) : (
        <CountriesList countries={filteredCountries} />
      )}
    </>
  )
}

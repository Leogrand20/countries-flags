import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'

import { getCountriesByCode } from '../../../api'

import styles from './Countries.module.css'

export const CountryInfo = ({
  name,
  flags,
  capital,
  population,
  region,
  subregion,
  tld = [],
  currencies = {},
  languages = {},
  borders = [],
}) => {
  const navigate = useNavigate()
  const [neighbors, setNeighbors] = useState([])

  useEffect(() => {
    if (borders.length) {
      getCountriesByCode(borders).then((data) => {
        setNeighbors(data.map((country) => country.name.common))
      })
    }
  }, [borders])

  return (
    <section className={styles.countryInfo}>
      <img
        className={styles.countryInfoImg}
        src={flags?.png}
        alt={flags?.alt}
      />

      <div className="info">
        <h1 className={styles.countryInfoTitle}>{name?.common}</h1>

        <div className={styles.countryInfoData}>
          <ul className={styles.countryDataList}>
            <li className={styles.countryDataListItem}>
              <strong>Native Name:</strong> {name?.official}
            </li>
            <li className={styles.countryDataListItem}>
              <strong>Population</strong>{' '}
              {new Intl.NumberFormat('ru-RU').format(population)}
            </li>
            <li className={styles.countryDataListItem}>
              <strong>Region:</strong> {region}
            </li>
            <li className={styles.countryDataListItem}>
              <strong>Sub Region:</strong> {subregion}
            </li>
            <li className={styles.countryDataListItem}>
              <strong>Capital:</strong> {capital}
            </li>
          </ul>

          <ul className={styles.countryDataList}>
            <li className={styles.countryDataListItem}>
              <strong>Top Level Domain: </strong> {tld[0]}
            </li>
            <li className={styles.countryDataListItem}>
              <strong>Currencies: </strong>
              {Object.values(currencies)[0]?.name}
            </li>
            <li className={styles.countryDataListItem}>
              <strong>Languages: </strong>
              {Object.values(languages).join(', ')}
            </li>
          </ul>
        </div>

        <div className={styles.countryInfoMeta}>
          <strong>Border Countries: </strong>

          {!borders.length ? (
            <span>There is no border countries</span>
          ) : (
            <div className={styles.countryInfoMetaTags}>
              {neighbors.map((neighbor) => (
                <span
                  key={neighbor}
                  className={styles.countryInfoMetaTagsSpan}
                  onClick={() =>
                    navigate(
                      `/country/${neighbor.toLowerCase().split(' ').join('?')}`,
                      { relative: 'path' },
                    )
                  }
                >
                  {neighbor}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

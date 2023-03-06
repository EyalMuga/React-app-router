import axios from "axios"
import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"





export default function CountryDetails() {
    const { countryCode } = useParams()
    const [country, setCountry] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getCountry = (countryCode) => {
        setLoading(true)
        axios
            .get(`https://restcountries.com/v3.1/alpha/${countryCode}`)
            .then((response) => {
                setCountry(response.data)
                setLoading(false)
            })
            .catch((error) => {
                setError(error)
                setLoading(false)
            })
    }
    
    useEffect(() => {
        getCountry(countryCode)
    }, [])

    return (
        <>
            <h1>Country Details</h1>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {country && (
                <div>
                    <h2>{country.name.common}</h2>
                    <p>Capital: {country.capital}</p>
                    <p>Region: {country.region}</p>
                    <p>Subregion: {country.subregion}</p>
                    <p>Population: {country.population}</p>
                </div>
            )}
        </>
    )
}


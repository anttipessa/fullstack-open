import React from 'react'
import Country from './Country'

const Countrylist = ({ count, handler }) => {

    if (count.length === 1) {
        return (
            <div>
                {count.map((country, i) =>
                    <Country key={i} name={country.name} capital={country.capital} pop={country.population} lang={country.languages} flag={country.flag} />
                )}

            </div>
        )
    } else if (count.length <= 10) {
        return (
            <div>
                {count.map((country, i) =>
                    <div key={i} > {country.name}  <button onClick={() => handler(country.name)}>show</button></div>
                )}

            </div>
        )
    } else {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

}

export default Countrylist
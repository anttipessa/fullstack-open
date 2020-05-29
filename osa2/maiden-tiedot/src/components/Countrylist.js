import React from 'react'
import Country from './Country'

const Countrylist = ({ count }) => {
    console.log(count.length)

    if (count.length == 1  ) {
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
                {count.map((country) =>
                 <div>{country.name}</div> 
                )}

            </div>
        )
    } else{
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

}

export default Countrylist
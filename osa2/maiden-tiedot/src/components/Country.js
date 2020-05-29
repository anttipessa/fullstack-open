import React from 'react'
import Weather from './Weather'

const Country = ({ name, capital, pop, lang, flag }) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>population {pop}</p>
            <h3>languages</h3>
            {lang.map((l, i) =>
                <li key={i}>{l.name}</li>
            )}
            <img src={flag} alt="new" width="300" height="150"
            />
            <Weather capital={capital} />
        </div>
    )
}

export default Country
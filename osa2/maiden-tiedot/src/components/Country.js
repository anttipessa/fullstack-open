import React from 'react'

const Country = ({ name, capital, pop, lang, flag }) => {
    console.log(lang)
    return (
        <div>
            <h1>{name}</h1>
            <p>capital {capital}</p>
            <p>population {pop}</p>
            <h3>languages</h3>
            {lang.map((l) =>
                <li>{l.name}</li>
            )}
            <img src={flag} alt="new" width="300" height="150"
            />
        </div>
    )
}

export default Country
const express = require("express")

async function randomCountries() {
    return fetch("http://localhost:3000/country-data")
    .then(data => {
        return data.json()
    })
    .then(json => {
        let countries = []
        while (countries.length < 4) {
            let randomCountry = json[Math.floor(Math.random(1, 250) * json.length)]
            let countryName = randomCountry.name.common
            if (!countries.includes(countryName)) {
                countries.push(countryName)
            }
        }
        return countries
    })
}

async function loadAndSend(min, max) {
        try {
            let res;

            return fetch("http://localhost:3000/country-data")
            .then(data => {
                return data.json()
            })
            .then(json => {
                let randomCountry = json[Math.floor(Math.random(1, 250) * json.length)]

                return fetch("https://restcountries.com/v3.1/name/" + randomCountry.name.common)
                    .then(data => {
                        return data.json()
                    })
                    .then(json => {
                        if (json[0].population > min && json[0].population < max) {
                            res = json[0]
                            return res
                        } else {
                            return loadAndSend(min, max)
                        }
                    })
            })
        } catch (error) {
            res.json(error)
        }
}

async function sendInfo(json) {
    const options = await randomCountries()

    return {
        details: {
            name: json.name.common,
            flag: json.flags.png,
            googleMaps: json.maps.googleMaps
        },
        otherOptions: options
    }
}

const app = express()
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Main page")
})

app.get("/random-country", (req, res) => {
    try {
        fetch("http://localhost:3000/country-data")
        .then(data => {
            return data.json()
        })
        .then(json => {
            res.send(json[Math.floor(Math.random() * json.length)])
        })
    } catch (error) {
        res.json(error)
    }
})

app.get("/random-country/easy", async (req, res) => {
    const value = await loadAndSend(50000000, Infinity)
    const result = await sendInfo(value)
    res.json(result)
})

app.get("/random-country/tough", async (req, res) => {
    const value = await loadAndSend(25000000, 50000000)
    const result = await sendInfo(value)
    res.json(result)
})

app.get("/random-country/hard", async (req, res) => {
    const value = await loadAndSend(9000000, 25000000)
    const result = await sendInfo(value)
    res.json(result)
})

app.get("/country-data", (req, res) => {
    try {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags")
        .then(data => {
            return data.json()
        })
        .then(json => {
            res.json(json)
        })
    } catch (error) {
        res.send(error)
    }
    
})

app.listen(3000, () => {
    console.log(`Started server at http://localhost:3000`)
})
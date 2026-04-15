const express = require("express")
const fs = require("fs")

function loadUsers() {
    const data = fs.readFileSync("scores.json", "utf-8")
    return JSON.parse(data)
}

function saveUsers(users) {
    fs.writeFileSync("scores.json", JSON.stringify(users, null, 2))
}
const cors = require("cors")



async function randomCountries(randomCountriesAmount) {
    return fetch("http://localhost:3000/country-data")
    .then(data => {
        return data.json()
    })
    .then(json => {
        let countries = []
        while (countries.length < randomCountriesAmount) {
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

async function sendInfo(json, num) {
    const options = await randomCountries(num)

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
app.use(cors());

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

app.get("/random-country/easy/", async (req, res) => {
    const otherOptionsAmount = 4
    const value = await loadAndSend(50000000, Infinity)
    const result = await sendInfo(value, otherOptionsAmount)
    res.json(result)
})

app.get("/random-country/tough/", async (req, res) => {
    const otherOptionsAmount = 4
    const value = await loadAndSend(25000000, 50000000)
    const result = await sendInfo(value, otherOptionsAmount)
    res.json(result)
})

app.get("/random-country/hard/", async (req, res) => {
    const otherOptionsAmount = 4
    const value = await loadAndSend(9000000, 25000000)
    const result = await sendInfo(value, otherOptionsAmount)
    res.json(result)
})

app.get("/random-country/easy/:num", async (req, res) => {
    const otherOptionsAmount = req.params.num
    const value = await loadAndSend(50000000, Infinity)
    const result = await sendInfo(value, otherOptionsAmount)
    res.json(result)
})

app.get("/random-country/tough/:num", async (req, res) => {
    const otherOptionsAmount = req.params.num
    const value = await loadAndSend(25000000, 50000000)
    const result = await sendInfo(value, otherOptionsAmount)
    res.json(result)
})

app.get("/random-country/hard/:num", async (req, res) => {
    const otherOptionsAmount = req.params.num
    const value = await loadAndSend(9000000, 25000000)
    const result = await sendInfo(value, otherOptionsAmount)
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

app.post("/scores", (req, res) => {
    const name = req.body.name
    const score = req.body.score
    const diff = req.body.difficulty
    
    const users = loadUsers()

    let user = users.find(u => u.name == name)

    if (!user) {
        user = {name,
            scores: []}
        users.push(user)
    }

    user.scores.push({score: score, difficulty: diff})
    saveUsers(users)
    res.send(user)
})

app.get("/scores/show", (req, res) => {
    const users = loadUsers()

    res.json(users)
})

app.get("/scores/leaderboard", (req, res) => {
    const users = loadUsers()

    let allscores = []

    users.forEach(user => {
        user.scores.forEach(score => {
            allscores.push({
                user: user.name,
                score: {score: score}
            })
        });
    });
    allscores.sort((a, b) => b.score - a.score)

    res.json(allscores.slice(0, 10))
})

app.get("/scores/leaderboard/easy", (req, res) => {
    const users = loadUsers()

    let allscores = []

    users.forEach(user => {
        user.scores.forEach(score => {
            if (score.difficulty == "easy") {
                allscores.push({
                    user: user.name,
                    score: {score: score.score, difficulty: "easy"}
                })
            }
        });
    });
    allscores.sort((a, b) => b.score - a.score)

    res.json(allscores.slice(0, 10))
})

app.get("/scores/leaderboard/tough", (req, res) => {
    const users = loadUsers()

    let allscores = []

    users.forEach(user => {
        user.scores.forEach(score => {
            if (score.difficulty == "tough") {
                allscores.push({
                    user: user.name,
                    score: {score: score.score, difficulty: "tough"}
                })
            }
        });
    });
    allscores.sort((a, b) => b.score - a.score)

    res.json(allscores.slice(0, 10))
})

app.get("/scores/leaderboard/hard", (req, res) => {
    const users = loadUsers()

    let allscores = []

    users.forEach(user => {
        user.scores.forEach(score => {
            if (score.difficulty == "hard") {
                allscores.push({
                    user: user.name,
                    score: {score: score.score, difficulty: "hard"}
                })
            }
        });
    });
    allscores.sort((a, b) => b.score - a.score)

    res.json(allscores.slice(0, 10))
})

app.listen(3000, () => {
    console.log(`Started server at http://localhost:3000`)
})
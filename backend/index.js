const express = require("express")

const app = express()
app.use(express.json())
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
    console.log("hi")
})
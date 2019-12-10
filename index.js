const express = require('express')
const movies = require('./movies.json')

const app = express()

app.get('/movies', (request, response) => {
    response.send(movies)
})

app.get('/movies/:x', (request, response) => {
    const matchingMovies = movies.filter((item) => {
        return item.x === request.params.x
    })

    if (matchingMovies.length) {
        response.send(matchingMovies)
    } else {
        response.sendStatus(404)
    }
})

app.all('*', (request, response) => {
    response.sendStatus(404)
})

app.listen(1337, () => { console.log('Listening on 1337...') })

module.exports = app
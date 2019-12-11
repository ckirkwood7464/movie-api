const express = require('express')
const moviesData = require('./movies.json')
const bodyParser = require('body-parser')
const app = express()

app.get('/movies', (request, response) => {
    response.send(moviesData)
})

app.get('/movies/:id', (request, response) => {
    const matchingMovie = moviesData.find((movie) => {
        return movie.id == request.params.id
    })

    if (matchingMovie) {
        response.send(matchingMovie)
    } else {
        response.sendStatus(404)
        
    }
})

app.get('/directors/:id', (request, response) => {
    const foundMovie = moviesData.find((movie) => {
        return movie.id == request.params.id
    })
    const matchingMovies = foundMovie && moviesData.filter((movie) => {
        return movie.directors === foundMovie.directors
    })
    if (matchingMovies.length) {
        response.send(matchingMovies)
    } else {
        response.sendStatus(404)
    }
})

app.get('/genres/:genre', (request, response) => {
    const matchingMovies = moviesData.filter((movie) => {
        return movie.genre == request.params.genre
    })

    if (matchingMovies.length) {
        response.send(matchingMovies)
    } else {
        response.sendStatus(404)
    }
})

app.use(bodyParser.json())

app.post('/movies', bodyParser.json(), (request, response) => {
    const {title, directors, releaseDate, rating, runtime, genre, id} = request.body

    if (!title || !directors || !releaseDate || !rating || !runtime || !genre || !id) {
        response.status(400).send('The following attributes are required: title, directors, releaseDate, rating, runtime, genre, and id')
    }

    const newMovie = {title, directors, releaseDate, rating, runtime, genre, id}

    moviesData.push(newMovie)
    response.status(201).send(newMovie)
})

app.all('*', (request, response) => {
    response.sendStatus(404)
})

app.listen(1337, () => { console.log('Listening on 1337...') })

module.exports = app
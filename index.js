const express = require('express')
// const moviesData = require('./movies.json')
const bodyParser = require('body-parser')
const models = require('./models')

const app = express()

app.get('/movies', (request, response) => {
    models.Movies.findAll().then((movies) => {
        response.send(movies)
    })
})

app.get('/movies/:id', (request, response) => {
    models.Movies.findOne({
        where: { id: request.params.id }
    }).then((movie) => {
        if (movie) {
            response.send(movie)
        } else {
            response.sendStatus(404)
        }
    })
    // const matchingMovie = moviesData.find((movie) => {
    //     return movie.id == request.params.id
    // })

    // if (matchingMovie) {
    //     response.send(matchingMovie)
    // } else {
    //     response.sendStatus(404)
        
    // }
})

app.get('/directors/:id', (request, response) => {
    models.Movies.findOne({
        where: {id: request.params.id }
    }).then((movie) => {
        models.Movies.findAll({
            where: {directors: movie.directors}
        }).then((movies) => {
            if (movies.length) {
                response.send(movies)
            } else {
                response.sendStatus(404)
            }
        })
    })
    // const foundMovie = moviesData.find((movie) => {
    //     return movie.id == request.params.id
    // })
    // const matchingMovies = foundMovie && moviesData.filter((movie) => {
    //     return movie.directors === foundMovie.directors
    // })
    // if (matchingMovies.length) {
    //     response.send(matchingMovies)
    // } else {
    //     response.sendStatus(404)
    // }
})

app.get('/genres/:genre', (request, response) => {
    models.Movies.findAll({
        where: { genre: request.params.genre}
    }).then((movies) => {
        if (movies.length) {
            response.send(movies)
        } else {
            response.sendStatus(404)
        }
    })
    // const matchingMovies = moviesData.filter((movie) => {
    //     return movie.genre == request.params.genre
    // })

    // if (matchingMovies.length) {
    //     response.send(matchingMovies)
    // } else {
    //     response.sendStatus(404)
    // }
})

app.use(bodyParser.json())

app.post('/movies', bodyParser.json(), (request, response) => {
    const {title, directors, releaseDate, rating, runtime, genre, id} = request.body

    const idAlias = id;

    if (!title || !directors || !releaseDate || !rating || !runtime || !genre || !id) {
        response.status(400).send('The following attributes are required: title, directors, releaseDate, rating, runtime, genre, and id')
    }

    models.Movies.findOne({ where: { id: idAlias }}).then((movie) => {
        if (movie) {
            response.sendStatus(400).send("Movie with that id already exists!")
        } else {
            models.Movies.create({title, directors, releaseDate, rating, runtime, genre, id}).then((newMovie) => {
                response.sendStatus(201).send(newMovie)
            })
        }
    })

    // const newMovie = {title, directors, releaseDate, rating, runtime, genre, id}

    // moviesData.push(newMovie)
    // response.status(201).send(newMovie)
})

app.all('*', (request, response) => {
    response.sendStatus(404)
})

app.listen(1337, () => { console.log('Listening on 1337...') })

module.exports = app
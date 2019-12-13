module.exports = (sequelize, Sequelize) => {
    return sequelize.define('movies', {
        id: {
            type: Sequelize.INTEGER, autoincrement: true, primaryKey: true
        },
        title: { type: Sequelize.STRING},
        directors: {type: Sequelize.STRING},
        releaseDate: {type: Sequelize.STRING},
        rating: {type: Sequelize.STRING},
        runtime: {type: Sequelize.STRING},
        genre: {type: Sequelize.STRING}
    })
}
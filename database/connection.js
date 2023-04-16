const mongoClient = require('mongodb').MongoClient

const state = {
    db: null
}

const connect = (done) => {
    const url = process.env.DB_URL
    const dbname = process.env.DB_NAME

    mongoClient.connect(url, (err, data) => {
        if (err) return done(err)
        state.db = data.db(dbname)
        done()
    })
}

const get = () => {        
    return state.db
}

module.exports = { connect, get }
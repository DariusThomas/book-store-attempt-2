export default {
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_SCHEMA,
        connectionLimit:10
    },
    auth:{
        secret: process.env.SECRET
    }
}
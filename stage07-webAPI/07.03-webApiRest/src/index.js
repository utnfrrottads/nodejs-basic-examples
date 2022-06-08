import 'dotenv/config'
import Express from 'express'
import Mongoose from 'mongoose'
import Cors from 'cors'
import Morgan from 'morgan'
//import Helmet from 'helmet'
//import RateLimit from 'express-rate-limit'
import rutas from './routes/api/v1/index.js'

const app = Express();
// connect to db
Mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.log(`Could not connect to MongoDB...${err}`))

// prebuild middlewares
app.use(Cors()) // Enable All CORS Requests
//app.use(Helmet()) // For securing http request headers (later on)
app.use(Morgan('tiny')) // request logger
app.use(Express.json()) // JSON parsing (body-parser replacement)

app.use('/api/v1', rutas)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}`))


import Express from 'express'
import client from './client.js'

const router = Express.Router()


router.use('/client', client);


export default router
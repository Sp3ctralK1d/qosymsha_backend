import user from './user'
import express, { Application } from 'express'

const app: Application = express()

user(app)

export default app

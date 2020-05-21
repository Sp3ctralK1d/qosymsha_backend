import express, { Application } from 'express'

import user from './user'
import univer from './univer'
import course from './course'

const app: Application = express()

user(app)
univer(app)
course(app)

export default app
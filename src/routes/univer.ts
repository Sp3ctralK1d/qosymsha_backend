import { Application, Request, Response } from 'express'

import UniverService from '../services/univer'

export default (app: Application) => {
    
    app.post('/univers/', async (req: Request, res: Response) => {
        const univer = req.body
        try {
            const serviceInstance = new UniverService()
            const univerInfo = await serviceInstance.Create(univer)
            return res.json(univerInfo).status(200)
        } catch (err) {
            return res.json(err).status(500)
        }
    })

    app.get('/univers/', async (req: Request, res: Response) => {
        try {
            const serviceInstance = new UniverService()
            const univers = await serviceInstance.Get()
            return res.json(univers).status(200)
        } catch (err) {
            return res.json(err).status(500)
        }
    })
}
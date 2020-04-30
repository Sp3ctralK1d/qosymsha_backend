import AuthService from '../services/auth'

import { Application, Request, Response } from 'express'

export default (app: Application) => {
    
    app.post('/user/login', async (req: Request, res: Response) => {
        const email = req.body.user.email
        const password = req.body.user.password

        try {
            const authServiceInstance = new AuthService()
            const { user, token } = await authServiceInstance.Login(email, password)
            return res.status(200).json({ user, token }).end()
        } catch (err) {
            return res.status(500).json(err).end()
        }
    })

    app.post('/user/signup', async (req: Request, res: Response) => {
        try {
            const { email, name, password } = req.body.user
            const authServiceInstance = new AuthService()
            const { user, token } = await authServiceInstance.SignUp(email, password, name)
            return res.status(200).json({ user, token }).end()
        } catch (err) {
            return res.status(500).json(err).end()
        }
    })
}
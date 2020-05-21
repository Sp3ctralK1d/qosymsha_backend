import { Application, Request, Response } from 'express'

import CourseService from '../services/course'

export default (app: Application) => {
    app.post('/courses/', async (req: Request, res: Response) => {
        const course = req.body

        try {
            const serviceInstance = new CourseService()
            const courseInfo = await serviceInstance.Create(course)
            return res.json(courseInfo).status(200)
        } catch (err) {
            return res.json(err).status(500)
        }
    })

    app.get('/courses/', async (req: Request, res: Response) => {
        try {
            const serviceInstance = new CourseService()
            const courses = await serviceInstance.Get()
            return res.json(courses).status(200)
        } catch (err) {
            return res.json(err).status(500)
        }
    })

    app.post('/courses/faculty/', async (req: Request, res: Response) => {
        const facultyName = req.body.name
        try { 
            const serviceInstance = new CourseService()
            const courses = await serviceInstance.GetByFaculty(facultyName)
            return res.json(courses).status(200)
        } catch (err) {
            return res.json(err).status(500)
        }
    })

}
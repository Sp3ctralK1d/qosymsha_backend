import CourseModel, { ICourse } from '../models/Course'

export default class CourseService {
    constructor() {}

    public async Create(course: ICourse) {
        const courseInfo = await CourseModel.create({
            ...course
        })

        return courseInfo
    }

    public async Get() {
        const courses = await CourseModel.find()
        return courses
    }

    public async GetByFaculty(name: string) {
        const courses = await CourseModel.find()
        const coursesByCategory = courses.filter(o => o.faculties.includes(name))
        return coursesByCategory
    }
}
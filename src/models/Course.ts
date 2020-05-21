import mongoose from 'mongoose'

export interface ICourse {
    name: string,
    faculties: [string]
}

const CourseSchema = new mongoose.Schema({
    name: String,
    faculties: [String],
})

export default mongoose.model<ICourse & mongoose.Document>('Course', CourseSchema)

